const admin = require('../../config/firebase-config');
const { COLLECTIONS } = require('../../constants/collection-constants');
const db = admin.firestore();

const findAvailableTable = async () => {
    try {
        const querySnapshot = await db.collection(COLLECTIONS.TABLE).where('tableStatus', '==', 'free').limit(1).get();

        if (!querySnapshot.empty) {
            return querySnapshot.docs[0].ref;
        }

        return null;
    } catch (error) {
        console.log('Error finding available table:', error);
        throw error;
    }
};

module.exports = { findAvailableTable };
