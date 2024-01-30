const admin = require('../../config/firebase-config');
const { COLLECTIONS } = require('../../constants/collection-constants');
const db = admin.firestore();

const deleteMenuItems = async menuItems => {
    try{
        await db.collection(COLLECTIONS.MENU).doc(menuItems).delete();
        console.log('Menu item deleted successfully.');
        return true;
    } catch (error) {
        return error;
    }
};

module.exports = deleteMenuItems;