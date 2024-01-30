const httpStatus = require('http-status');
const { deleteMenuItems } = require('../../database-functions/menu/del-menu-items');
const ApiError = require('../../utils/ApiError');
const generateResponse = require('../../utils/generate-response');

const deleteMenuItemController = async (req, res, next) => {

    try {
        const { title = '' } = req.body;
        if (!title) {
            throw new ApiError(httpStatus[400],"not found data");
        }
        await deleteMenuItems(title);
        return res.send(generateResponse("Menu Item Deleted"));
    } catch (error) {
        return next(error);
    }
};

module.exports = deleteMenuItemController;