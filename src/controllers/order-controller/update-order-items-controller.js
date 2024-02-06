const { updateOrderItems } = require('../../database-functions/order/upd-order-item');
const generateResponse = require('../../utils/generate-response');
const { getMenuPrices } = require('../../database-functions/menu/get-menu-prices');
const lodash = require('lodash');

const updateOrderItemsController = async (req, res, next) => {
    try {
        const {
            body: {
                orderId,
                customerName,
                mobileNo,
                selectedItems,
                tableNo,
                orderStatus,
            },
        } = req;

        const itemsData = selectedItems.map(item => ({ title: item.title, quantity: item.quantity }));

        const prices = await getMenuPrices(itemsData);

        const totalAmount = itemsData.reduce((total, item) => {
            const itemPrice = prices[item.title] || 0; 
            return total + itemPrice * item.quantity;
        }, 0);

        let data = {
            orderId,
            customerName,
            mobileNo,
            selectedItems,
            tableNo,
            totalAmount,
            orderStatus,
        };

        data = lodash.pickBy(data, lodash.identity);

        await updateOrderItems(orderId, data);
        return res.send(generateResponse("Updated order item successfully",data));

    } catch (error) {
        return next(error);
    }
};

module.exports = updateOrderItemsController;
