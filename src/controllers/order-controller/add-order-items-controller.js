const shortid = require('shortid');
const { addOrderItems } = require('../../database-functions/order/add-order-item');
const { updateOrderItems } = require('../../database-functions/order/upd-order-item');
const { getMenuPrices } = require('../../database-functions/menu/get-menu-prices');
const { findAvailableTable, getCustomerNameByOrderId, updateTableStatus } = require('../../database-functions/order/findAvailableTable');
const { paymentItems } = require('../../database-functions/payment/upd-payment-status');
const generateResponse = require('../../utils/generate-response');

const addOrderItemController = async (req, res, next) => {
    try {
        const {
            body: {
                customerName = '',
                mobileNo = '',
                selectedItems = [], 
                tableNo = '',
                paymentStatus = '',
                paymentMethod = ''
            },
        } = req;

        const { status: tableStatus, data: tableData } = await findAvailableTable(tableNo);
        
        if (paymentStatus === 'done') {
            orderStatus = 'complete';
        } else {
            orderStatus = 'pending';
        }

        if (tableStatus === 'free') {
            const orderId = shortid.generate();
            const itemsData = selectedItems.map(item => ({ title: item.title, quantity: item.quantity }));
            const prices = await getMenuPrices(itemsData);

            const totalAmount = itemsData.reduce((total, item) => {
                const itemPrice = prices[item.title] || 0; 
                return total + itemPrice * item.quantity;
            }, 0);
            
            const data = {
                orderId,
                customerName,
                mobileNo,
                selectedItems, 
                tableNo,
                totalAmount,
                orderStatus,
                paymentStatus,
                paymentMethod,
            };
            await addOrderItems(data);

            await updateTableStatus(tableNo, orderId, 'occupied');
            
            if (paymentStatus === 'done') {
                await paymentItems({ orderId, paymentStatus, paymentMethod });
            }

            return res.send(generateResponse('Order added successfully', data));
        } 
        else if (tableStatus === 'occupied') {
            const orderIdFromTable = tableData.orderId;

            if (orderIdFromTable) {
                const customerNameFromOrder = await getCustomerNameByOrderId(orderIdFromTable);

                if (customerNameFromOrder) {
                    const itemsData = selectedItems.map(item => ({ title: item.title, quantity: item.quantity }));
                    const prices = await getMenuPrices(itemsData);
                    const totalAmount = itemsData.reduce((total, item) => {
                        const itemPrice = prices[item.title] || 0; 
                        return total + itemPrice * item.quantity;
                    }, 0);

                    const data = {
                        orderId: orderIdFromTable,
                        customerName: customerNameFromOrder, 
                        mobileNo,
                        selectedItems, 
                        tableNo,
                        totalAmount,
                        orderStatus,
                        paymentStatus,
                        paymentMethod,
                    };
                    await updateOrderItems(orderIdFromTable, data);

                    if (paymentStatus === 'done') {
                        await paymentItems({ orderId: orderIdFromTable, paymentStatus, paymentMethod });
                    }

                    return res.send(generateResponse('Order updated successfully', data));
                } else {
                    return res.send(generateResponse('Failed to fetch customer name for the provided order ID'));
                }
            } else {
                return res.send(generateResponse('No order found for the provided table number'));
            }
        } else {
            return res.send(generateResponse(`Table ${tableNo} is not available.`));
        }
    } catch (error) {
        return next(error);
    }
};

module.exports = addOrderItemController;
