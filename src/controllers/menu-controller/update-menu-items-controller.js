const { updateMenuItems } = require('../../database-functions/menu/upd-menu-items');
const generateResponse = require('../../utils/generate-response');
const lodash =require('lodash');

const updateMenuItemsController = async (req, res, next) => {
    try{
        const{
            body:{
                title,
                description,
                type,
                price,
            },
        } = req;

        let data = {
            title,
            description,
            type,
            price
        };

        data = lodash.pickBy(data, lodash.identity);
        await updateMenuItems(data);
        return res.send(generateResponse("updated menu item",data));
    } catch (error) {
        return next(error);
    }
};

module.exports = updateMenuItemsController;