const admin = require('../../config/firebase-config');
const { COLLECTIONS } = require('../../constants/collection-constants');
const db = admin.firestore();

const addTableItems = async tableItems => {
    try{
        await db.collection(COLLECTIONS.TABLE).doc(tableItems.tableNo).create(tableItems);
        console.log('Table items added successfully');
        return true;
    } catch (error) {
        return error;
    }
};

module.exports = { addTableItems };