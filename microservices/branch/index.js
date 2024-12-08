
const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const { config, morgan, logger } = require('@monos-market-place/config');
const { errorHandler } = require('@monos-market-place/errors');
const { validate, APIError } = require('@monos-market-place/utilities');
const { router } = require('./src/routes');
const { subscriber } = require('./src/subscriber');
const rabbitmq = require('@monos-market-place/broker/rabbitmq');

const connectDbWithRetry = () => {
    mongoose.connect(config.db)
        .then(() => {
            logger.info(`📀 successfully connected to db: ${config.db}`);
        })
        .catch((err) => {
            logger.error(`Failed to connect to db. Exiting... ${err.message}`);
            logger.info('Retrying connection in 2 seconds...');
            setTimeout(connectDbWithRetry, 2000); // Retry after 2 seconds
        });
};

const connectBrokerWithRetry = async () => {
    try {
        const channel = await rabbitmq.workerQueue.amqpInitializeQueue({ config });
        await rabbitmq.workerQueue.consumeFromQueue({
            channel,
            queue: 'branch',
            subscriberHandler: subscriber.subscriberHandler,
        });
    } catch (error) {
        logger.error(error);
        logger.info('Retrying broker connection in 2 seconds...');
        setTimeout(connectBrokerWithRetry, 2000); // Retry after 2 seconds
    }
};

connectDbWithRetry();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: `hello from @monos-market-place/branch` });
});

const server = http.createServer(app);

server.on('error', (err) => {
    logger.error(err);
    if (err.code === 'EADDRINUSE') {
        logger.error('Address already in use, retrying...');
        setTimeout(() => {
            server.close();
            server.listen(config.port, 'localhost');
        }, 1000);
        errorHandler(err);
    }
});

server.listen(config.port, () => {
    logger.info(`🚀 @monos-market-place/branch listening at: http://localhost:${config.port}`);
    connectBrokerWithRetry();
});

app.use(morgan.errorHandler);

app.use(morgan.successHandler);

app.use('/api/v1', router);

// Global error handler should come after all other middlewares
app.all('*', (req, res, next) => {
    const err = new APIError(404, `requested resource not found on server: ${req.originalUrl}`);
    next(err);
});

app.use(errorHandler);
