const { addTableItems } = require('../../database-functions/table/add-table-items');
const generateResponse = require('../../utils/generate-response');

const addTableItemCOntroller = async (req, res, next) => {
    try{
        const{
            body:{
                tableNo="",
                status="",
                orderId="",
            },
        } = req;
        const data = {
            tableNo,
            status,
            orderId,
        };
        await addTableItems(data);
        return res.send(generateResponse("Table added successfully",data));
    } catch (error) {
        return next(error);
    }
};

module.exports = addTableItemCOntroller;