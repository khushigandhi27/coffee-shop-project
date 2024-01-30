const admin = require('../../config/firebase-config');
const { COLLECTIONS } = require('../../constants/collection-constants');
const db = admin.firestore();

const updateMenuItems = async menuItems => {
    try{
        await db.collection(COLLECTIONS.MENU).doc(menuItems.title).update(menuItems);
        return true;
    } catch (error) {
        return error;
    }
};

module.exports = updateMenuItems;