const { updateOrderItems } = require('../../database-functions/order/upd-order-item');
const generateResponse = require('../../utils/generate-response');
const lodash =require('lodash');

const updateOrderItemsController = async (req, res, next) => {
    try{
        const{
            body:{
                orderId,
                customerName,
                mobileNo,
                coffee,
                snacks,
                coffeeQuantity,
                snacksQuantity,
                dineIn,
                takeAway,
                appOrder,
                totalAmount,
            },
        } = req;

        let data = {
            orderId,
            customerName,
            mobileNo,
            coffee,
            snacks,
            coffeeQuantity,
            snacksQuantity,
            dineIn,
            takeAway,
            appOrder,
            totalAmount
        };

        data = lodash.pickBy(data, lodash.identity);
        await updateOrderItems(data);
        return res.send(generateResponse("updated order item",data));
    } catch (error) {
        return next(error);
    }
};

module.exports = updateOrderItemsController;