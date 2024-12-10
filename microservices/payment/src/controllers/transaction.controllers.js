
const https = require('https');
const services = require('../services/transaction.services');
const { asyncErrorHandler, APIError } = require('@monos-market-place/utilities');

const createTransaction = asyncErrorHandler(async (req, res) => {
    const { body } = req;
    const { transaction: data } = await services.createTransaction({ body });
    res.status(201).json({ data });
});

const getTransactions = asyncErrorHandler(async (req, res) => {
    const { transactions: data } = await services.getTransactions();
    res.status(200).json({ data });
});

const getTransaction = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { transaction: data } = await services.getTransactionById({ id });
    if (!data) {
        throw new APIError(404, 'transaction not found');
    }
    res.status(200).json({ data });
});

const updateTransaction = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const { transaction } = await services.getTransactionById({ id });
    if (!transaction) {
        throw new APIError(404, 'transaction not found');
    }
    const { upserted_transaction: data } = await services.updateTransactionProfile({ id, body });
    res.status(200).json({ data });
});


const initializeTransaction = asyncErrorHandler(async (req, res) => {
    const { email, amount } = req.body;

    if (!email || !amount) {
        throw new APIError(400, 'Email and amount are required');
    }

    const params = JSON.stringify({
        email,
        amount: amount * 100, // Convert to kobo/cents
    });

    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json',
        },
    };

    // Wrap `https.request` in a Promise
    const response = await new Promise((resolve, reject) => {
        const request = https.request(options, (paystackRes) => {
            let data = '';

            paystackRes.on('data', (chunk) => {
                data += chunk;
            });

            paystackRes.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                } catch (error) {
                    reject(new APIError(500, 'Error parsing Paystack response'));
                }
            });
        });

        request.on('error', (error) => {
            reject(new APIError(500, 'Error initializing transaction'));
        });

        request.write(params);
        request.end();
    });

    // Handle response
    if (response.status) {
        // Save transaction to the database
        await services.createTransaction({
            body: {
                userId: req.user?.id || null,
                email,
                amount,
                reference: response.data.reference,
                status: 'pending',
            }
        });

        res.status(200).json({
            success: true,
            message: 'Transaction initialized successfully',
            authorizationUrl: response.data.authorization_url,
        });
    } else {
        throw new APIError(400, response.message || 'Failed to initialize transaction');
    }
});


const verifyTransaction = asyncErrorHandler(async (req, res) => {
    const { reference } = req.body;

    if (!reference) {
        return res.status(400).json({
            success: false,
            message: 'Transaction reference is required',
        });
    }

    const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: `/transaction/verify/${reference}`,
        method: 'GET',
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
    };

    // Wrap https.request in a Promise to handle it with async/await
    const response = await new Promise((resolve, reject) => {
        const request = https.request(options, (paystackRes) => {
            let data = '';

            paystackRes.on('data', (chunk) => {
                data += chunk;
            });

            paystackRes.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                } catch (error) {
                    reject(new Error('Error parsing Paystack response'));
                }
            });
        });

        request.on('error', (error) => {
            reject(new Error('Error with Paystack request'));
        });

        request.end();
    });

    // Handle the response from Paystack
    if (response.status) {
        // Update the transaction in the database
        const transaction = await services.updateTransactionByReference({ reference });
        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: 'Transaction not found',
            });
        }

        transaction.status = response.data.status; // 'success' or 'failed'
        transaction.gatewayResponse = response.data.gateway_response;
        await transaction.save();

        return res.status(200).json({
            success: true,
            message: 'Transaction verified successfully',
            data: response.data,
        });
    } else {
        return res.status(400).json({
            success: false,
            message: response.message || 'Transaction verification failed',
        });
    }
});


module.exports = {
    createTransaction,
    getTransactions,
    getTransaction,
    updateTransaction,
    verifyTransaction,
    initializeTransaction
};

