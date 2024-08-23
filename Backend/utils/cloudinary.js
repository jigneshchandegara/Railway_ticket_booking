const cloudinary = require("cloudinary").v2;
const fs = require("fs");


cloudinary.config({
    cloud_name: 'daa7nxucz',
    api_key: '483774672511427',
    api_secret: 'c39nrhmtQNE87JNNIxBG9M29Tfg'
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}

// const uploadOnCloudinary = (path) => {
//     return cloudinary.uploader.upload(path,
//         { public_id: "blog image" },
//         function (error, result) { return result });
// }



module.exports = uploadOnCloudinary
