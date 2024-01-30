const admin = require('../../config/firebase-config');
const { COLLECTIONS } = require('../../constants/collection-constants');
const db = admin.firestore();

const addOrderItems = async orderItems => {
    try{
        await db.collection(COLLECTIONS.ORDER).doc(orderItems.orderId).create(orderItems);
        console.log('Order added successfully');
        return true;
    } catch (error) {
        return error;
    }
};

module.exports = { addOrderItems };