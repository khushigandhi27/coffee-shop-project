const admin = require('../../config/firebase-config');
const { COLLECTIONS } = require('../../constants/collection-constants');
const db = admin.firestore();

const deleteOrderItems = async orderItems => {
    try{
        await db.collection(COLLECTIONS.ORDER).doc(orderItems).delete();
        console.log('Order item deleted successfully.');
        return true;
    } catch (error) {
        return error;
    }
};

module.exports = { deleteOrderItems } ;