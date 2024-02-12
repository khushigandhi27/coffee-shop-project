const admin = require('../../config/firebase-config');
const { COLLECTIONS } = require('../../constants/collection-constants');
const db = admin.firestore();

const updOrderStatus = async ( orderId, orderStatus) => {
    try {
        await db.collection(COLLECTIONS.ORDER).update({ orderStatus, orderId });
        console.log(`Payment complete for table ${tableRef.id} with order ${orderId}. Status: ${orderStatus}`);
    } catch (error) {
        console.log('Error completing payment:', error);
        throw error;
    }
};

module.exports = { updOrderStatus };
