const shortid = require('shortid');
const { addOrderItems } = require('../../database-functions/order/add-order-item');
const { getMenuPrices } = require('../../database-functions/menu/get-menu-prices');
const { completePayment } = require('../../database-functions/order/completePayment');
const { findAvailableTable } = require('../../database-functions/order/findAvailableTable');
const generateResponse = require('../../utils/generate-response');

const addOrderItemController = async (req, res, next) => {
    try {
        const {
            body: {
                customerName = '',
                mobileNo = '',
                selectedItems = [], 
                tableNo = '',
                orderStatus = '',
            },
        } = req;

        const itemsData = selectedItems.map(item => ({ title: item.title, quantity: item.quantity }));

        const prices = await getMenuPrices(itemsData);

        const totalAmount = itemsData.reduce((total, item) => {
            const itemPrice = prices[item.title] || 0; 
            return total + itemPrice * item.quantity;
        }, 0);

        const orderId = shortid.generate();
        
        const availableTableRef = await findAvailableTable(orderStatus);

        if (availableTableRef) {
            await completePayment(availableTableRef, orderId, orderStatus);

            const data = {
                orderId,
                customerName,
                mobileNo,
                selectedItems, 
                tableNo,
                totalAmount,
                orderStatus,
            };

            data.tableNo = availableTableRef.id;

            await addOrderItems(data);
            return res.send(generateResponse('Order added successfully',data));
        } else {
            return res.send(generateResponse(`No available table with ${orderStatus} status found.`));
        }
    } catch (error) {
        return next(error);
    }
};

module.exports = addOrderItemController;
