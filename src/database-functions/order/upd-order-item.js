const admin = require('../../config/firebase-config');
const { COLLECTIONS } = require('../../constants/collection-constants');
const db = admin.firestore();

const updateOrderItems = async (orderId, data) => {
    try {
        const existingOrder = await db.collection(COLLECTIONS.ORDER).doc(orderId).get();

        if (existingOrder.exists) {
            const existingData = existingOrder.data();

            if (data.orderId && data.orderId !== existingData.orderId) {
                throw new Error("Cannot modify orderId.");
            }

            if (data.tableNo && data.tableNo !== existingData.tableNo) {
                throw new Error("Cannot modify tableNo.");
            }

            if (existingData.orderStatus === 'complete') {
                throw new Error("Order status is already 'complete'. Cannot update again.");
            }

            await db.collection(COLLECTIONS.ORDER).doc(orderId).update(data);
            console.log("Updated successfully");
            return true;
        } else {
            throw new Error("Order not found.");
        }
    } catch (error) {
        throw error;
    }
};

module.exports = { updateOrderItems };
