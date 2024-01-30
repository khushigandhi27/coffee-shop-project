const admin = require('../../config/firebase-config');
const { COLLECTIONS } = require('../../constants/collection-constants');
const db = admin.firestore();

const updateOrderItems = async orderItems => {
    try {
        await db.collection(COLLECTIONS.ORDER).doc(orderItems.orderId).update(orderItems);
        console.log("updated successfully");
        return true;
    } catch (error) {
        return error;
    }
};

module.exports = { updateOrderItems };