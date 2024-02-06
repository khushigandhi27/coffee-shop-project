const { paymentItems } = require('../../database-functions/payment/upd-payment-status');
const generateResponse = require('../../utils/generate-response');

const addPaymentController = async (req, res, next) => {
    try {
        const {
            body: {
                orderId='',
                paymentStatus='',
                paymentMethod='',
            },
        } = req;

        const data = {
            orderId,
            paymentStatus,
            paymentMethod,
        };

        await paymentItems(data);
        return res.send(generateResponse("Added payment item successfully",data));

    } catch (error) {
        return next(error);
    }
};

module.exports = addPaymentController;
