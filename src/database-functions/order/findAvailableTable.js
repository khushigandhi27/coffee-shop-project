const admin = require('../../config/firebase-config');
const { COLLECTIONS } = require('../../constants/collection-constants');
const db = admin.firestore();

const findAvailableTable = async (tableNo) => {
    try {
        const tableRef = db.collection(COLLECTIONS.TABLE).doc(tableNo);
        const tableSnapshot = await tableRef.get();

        if (!tableSnapshot.exists) {
            return { status: 'not_found' };
        }

        const tableData = tableSnapshot.data();
        const tableStatus = tableData.tableStatus || 'occupied'; 

        return { status: tableStatus, data: tableData };
    } catch (error) {
        console.log('Error finding table status:', error);
        throw error;
    }
};

const getCustomerNameByOrderId = async (orderId) => {
    try {
        const querySnapshot = await db.collection(COLLECTIONS.ORDER)
            .where('orderId', '==', orderId)
            .get();

        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].data().customerName;
        }

        return null;
    } catch (error) {
        console.log('Error fetching customer name by order id:', error);
        throw error;
    }
};

const updateTableStatus = async (tableNo, orderId, tableStatus) => {
    try {
        const tableRef = db.collection(COLLECTIONS.TABLE).doc(tableNo);
        const tableSnapshot = await tableRef.get();

        if (!tableSnapshot.exists) {
            throw new Error("Table not found.");
        }

        const updateData = {
            tableStatus
        };

        if (orderId) {
            updateData.orderId = orderId;
        }

        await tableRef.update(updateData);
        console.log("Table status updated");
    } catch (error) {
        throw error;
    }
};

module.exports = { findAvailableTable, getCustomerNameByOrderId, updateTableStatus };
