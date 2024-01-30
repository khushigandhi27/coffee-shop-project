const { addMenuItems } = require('../../database-functions/menu/add-menu-item');
const generateResponse = require('../../utils/generate-response');

const addMenuItemsController = async (req, res, next) => {
    try{
        const{
            body:{
                title='',
                description='',
                type='',
                price='',
            },
        } = req;
        const data = {
            title,
            description,
            type,
            price
        };
        await addMenuItems(data);

        return res.send(generateResponse("Item added to menu",data));
    } catch (error) {
        return next(error);
    }
};

module.exports = addMenuItemsController;