const path = require('path');

const { getType } = require('mime');

const { putSignedUrl } = require('../../storage/signed-url');
const { checkIfImageFile } = require('../../utils/check-extensions');

const { STORAGE_PREFIX_KEY } = require('../../utils/constants');
const generateResponse = require('../../utils/generate-response');
const getMessage = require('../../utils/get-message');

const addMenuImage = async (req, res) => {
  try {
    const { fileName, category } = req.body;
    const mimeType = getType(fileName);
    const fileExtension = path.extname(fileName);

    if (!checkIfImageFile(fileExtension)) {
      return generateResponse(getMessage('FILE_NOT_SUPPORTED'), 400);
    }

    const date = new Date();

    let folderName;
    if (category.toLowerCase() === 'coffee') {
      folderName = STORAGE_PREFIX_KEY.COFFEE_IMAGE;
    } else if (category.toLowerCase() === 'snacks') {
      folderName = STORAGE_PREFIX_KEY.SNACKS_IMAGE;
    } else {
      folderName = 'other';
    }

    const defaultMenuPrefix = `${folderName}/${fileName}`;
    const signedUrl = await putSignedUrl(defaultMenuPrefix, mimeType);

    return res.send({
      signedUrl,
      getUrl: defaultMenuPrefix,
      fileName,
    });
  } catch (error) {
    const errorResponse = generateResponse(error.message, 500);
    return res.status(500).send(errorResponse);
  }
};

module.exports = { addMenuImage };