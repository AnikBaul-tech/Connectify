const ImageKit = require('@imagekit/nodejs/index.js');

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});


async function uploadFile(file,fileName){
    const response = await client.files.upload({
        file: file.toString("base64"),
        fileName: fileName,
    });

    return response;

}

module.exports = {
    uploadFile
}