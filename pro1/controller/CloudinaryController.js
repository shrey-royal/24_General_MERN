const cloudinary = require('cloudinary').v2;

const uploadFile = async(file) => {
    cloudinary.config({
        cloud_name: "dngddl4aj",
        api_key: "856451545528636",
        api_secret: "TzMUNuK4WOKASJOD3IPTj0CtP-8"
    });

    const result = await cloudinary.uploader.upload(file.path);
    console.log(result);
    return result;
}

module.exports = {
    uploadFile
};