const admin = require('../../config/firebase-config');
const { COLLECTIONS } = require('../../constants/collection-constants');
const db = admin.firestore();

const paymentItems = async (data) => {
    try {
        const { orderId, paymentStatus, paymentMethod } = data;

        if (!orderId || !paymentStatus || !paymentMethod) {
            throw new Error("Invalid data provided.");
        }

        await db.collection(COLLECTIONS.PAYMENT).doc(orderId).create(data);
        console.log("Payment document added successfully");

        const orderSnapshot = await db.collection(COLLECTIONS.ORDER).doc(orderId).get();
        if (!orderSnapshot.exists) {
            throw new Error("Order not found.");
        }

        const orderData = orderSnapshot.data();
        const tableNo = orderData.tableNo;

        const tableRef = await db.collection(COLLECTIONS.TABLE).doc(tableNo);
        await tableRef.update({ tableStatus: 'free' });
        console.log("Table status updated to 'free'");

        return true;
    } catch (error) {
        throw error;
    }
};

module.exports = { paymentItems };
