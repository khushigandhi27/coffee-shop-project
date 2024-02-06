const admin = require('../../config/firebase-config');
const { COLLECTIONS } = require('../../constants/collection-constants');
const db = admin.firestore();

const getMenuPrices = async (itemsData) => {
    try {
        const prices = {};

        for (const { title } of itemsData) {
            try {
                const menuSnapshot = await db.collection(COLLECTIONS.MENU)
                    .where('title', '==', title)
                    .get();

                if (!menuSnapshot.empty) {
                    const menuData = menuSnapshot.docs[0].data();
                    if (menuData && menuData.price) {
                        prices[title] = menuData.price;
                    }
                } else {
                    console.log(`Menu item not found for ${title}. Using default price.`);
                    prices[title] = 0; 
                }
            } catch (error) {
                throw error;
            }
        }

        return prices;
    } catch (error) {
        throw error;
    }
};

module.exports = {getMenuPrices};
