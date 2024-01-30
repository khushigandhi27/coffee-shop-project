const admin = require('../../config/firebase-config');
const { COLLECTIONS } = require('../../constants/collection-constants');
const db = admin.firestore();

const addMenuItems = async menuItems => {
    try{
        await db.collection(COLLECTIONS.MENU).doc(menuItems.title).create(menuItems);
        console.log('Menu item added successfully');
        return true;
    } catch (error) {
        return error;
    }
};

module.exports = addMenuItems;