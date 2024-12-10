
const services = require('../services/services');
const https = require('https')

const { asyncErrorHandler, APIError } = require('@monos-market-place/utilities');

const createPayment = asyncErrorHandler(async (req, res) => {
    const { body } = req;
    const { payment: data } = await services.createPayment({ body });
    res.status(201).json({ data });
});

const getPayment = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { payment: data } = await services.getPaymentById({ id });
    if (!data) {
        throw new APIError(404, 'payment not found');
    }
    res.status(200).json({ data });
});


const getPayments = asyncErrorHandler(async (req, res) => {
    const { payments: data } = await services.getPayments();
    res.status(200).json({ data });
});

const updatePayment = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const { payment } = await services.getPaymentById({ id });
    if (!payment) {
        throw new APIError(404, 'payment not found');
    }
    const { upserted_payment: data } = await services.updatePaymentProfile({ id, body });
    res.status(200).json({ data });
});

const getRedirectUrl = asyncErrorHandler(async (req, res) => {
    // Prepare request payload
    const params = JSON.stringify({
        email: req.body.email,
        amount: req.body.amount * 100, // Convert to kobo (Paystack requires amount in the smallest currency unit)
    });

    const options = {
        hostname: process.env.PAYMENT_GATEWAY,
        port: 443,
        path: '/transaction/initialize',
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.PAYMENT_GATEWAY_SECRET}`,
            'Content-Type': 'application/json',
        },
    };

    // Perform the HTTP request
    const paystackResponse = await new Promise((resolve, reject) => {
        const request = https.request(options, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                try {
                    const parsedData = JSON.parse(data);
                    resolve(parsedData);
                } catch (error) {
                    reject(new Error('Invalid JSON response from payment gateway'));
                }
            });
        });

        request.on('error', (error) => {
            console.log(error)
            reject(error);
        });

        request.write(params);
        request.end();
    });

    // Extract and send the authorization URL
    const { data } = paystackResponse;
    const authorization_url = data?.authorization_url;

    if (!authorization_url) {
        throw new Error('Unable to retrieve authorization URL');
    }

    res.status(200).json({ data: { url: authorization_url } });
});



module.exports = {
    createPayment,
    getPayment,
    updatePayment,
    getRedirectUrl,
    getPayments
};

