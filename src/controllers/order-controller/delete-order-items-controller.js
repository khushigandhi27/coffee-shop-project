const httpStatus = require('http-status');
const { deleteOrderItems } = require('../../database-functions/order/del-order-items');
const ApiError = require('../../utils/ApiError');
const generateResponse = require('../../utils/generate-response');

const deleteOrderItemController = async (req, res, next) => {

    try {
        const { orderId = '' } = req.body;
        if (!orderId) {
            throw new ApiError(httpStatus[400],"not found data");
        }
        await deleteOrderItems(orderId);
        return res.send(generateResponse("Order Item Deleted"));
    } catch (error) {
        return next(error);
    }
};

module.exports = deleteOrderItemController;