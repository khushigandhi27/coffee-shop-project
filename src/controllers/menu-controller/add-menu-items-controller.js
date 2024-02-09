const { fetchMenuImage } = require('../../database-functions/menu/fetchMenuImage');
const generateResponse = require('../../utils/generate-response');
const { addMenuItems } = require('../../database-functions/menu/add-menu-item');
const { isStringsArray } = require('../../utils/check-extensions');

const addMenuItemsController = async (req, res, next) => {
    try {
        const {
            body: { 
                title = '', 
                description = '', 
                category = '', 
                price = '',
                imageUrl=''
            },
        } = req;

        const data = {
            title,
            description,
            category,
            price,
            imageUrl,
        };

        await addMenuItems(data);

        return res.send(generateResponse('Item added to menu', data));
    } catch (error) {
        return next(error);
    }
};

module.exports = addMenuItemsController;
