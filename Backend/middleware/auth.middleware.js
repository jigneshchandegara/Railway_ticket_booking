let jwt = require("jsonwebtoken");
const Admin = require("../model/Admin.model");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");


const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        // console.log(token, "token");
        // console.log(_, "token");

        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = decodedToken;
        req.admin = decodedToken;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token")
    }

})

module.exports = verifyJWT