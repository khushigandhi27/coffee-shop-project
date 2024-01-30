const shortid =require('shortid');
const { addOrderItems } = require('../../database-functions/order/add-order-item');
const generateResponse = require('../../utils/generate-response');

const addOrderItemCOntroller = async (req, res, next) => {
    try{
        const{
            body:{
                customerName='',
                mobileNo='',
                coffee='',
                snacks='',
                coffeeQuantity='',
                snacksQuantity='',
                dineIn='',
                takeAway='',
                appOrder='',
                totalAmount='',
            },
        } = req;
        const orderId = shortid.generate();
        const data = {
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
        await addOrderItems(data);
        return res.send(generateResponse("Order added successfully",data));
    } catch (error) {
        return next(error);
    }
};

module.exports = addOrderItemCOntroller;