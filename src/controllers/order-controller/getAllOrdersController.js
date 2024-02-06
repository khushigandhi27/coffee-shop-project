const { getAllOrders } = require('../../database-functions/order/getAllOrders');
const generateResponse = require('../../utils/generate-response');

const getAllOrdersController = async (req, res, next) => {
    try {
        const orders = await getAllOrders();
        return res.send(generateResponse("Orders fetched successfully", orders));
    } catch (error) {
        return error;
    }
};

module.exports = getAllOrdersController;
