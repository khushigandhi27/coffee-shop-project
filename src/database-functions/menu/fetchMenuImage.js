const { checkIfImageFile } = require('../../utils/check-extensions');
const admin = require('../../config/firebase-config');

const fetchMenuImage = async (category, title) => {
    try {
        const imagePath = `${category}/${title}`;

        const imageRef = admin.storage().bucket().file(imagePath);
        const [imageUrl] = await imageRef.getSignedUrl({ action: 'read', expires: '2025-02-01' });

        const fileExtension = imagePath.split('.').pop();

        if (!checkIfImageFile(`.${fileExtension}`)) {
            throw new Error('Invalid image file format.');
        }

        return imageUrl;
    } catch (error) {
        throw error;
    }
};

module.exports = { fetchMenuImage };
