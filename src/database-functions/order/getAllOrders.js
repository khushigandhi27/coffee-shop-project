const admin = require('../../config/firebase-config');
const { COLLECTIONS } = require('../../constants/collection-constants');
const db = admin.firestore();

const getAllOrders = async () => {
    try {
        const snapshot = await db.collection(COLLECTIONS.ORDER).get();
        const orders = snapshot.docs.map(doc => doc.data());
        return orders;
    } catch (error) {
        console.log('Error fetching all orders:', error);
        throw error;
    }
};

module.exports = { getAllOrders };
