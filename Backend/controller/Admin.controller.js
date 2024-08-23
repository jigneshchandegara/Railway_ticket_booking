const Admin = require("../model/Admin.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");


const generateAccessAndRefereshTokens = async (adminid) => {
    try {
        const admin = await Admin.findById(adminid)
        const accessToken = admin.generateAccessToken()
        const refreshToken = admin.generateRefreshToken()

        admin.refreshToken = refreshToken
        await admin.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

let register = asyncHandler(async (req, res) => {

    let { name, email, password, phone } = req.body;
    if (
        [name, email, password, phone].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedAdmin = await Admin.findOne({ name })

    if (existedAdmin) {
        throw new ApiError(409, "Admin with email or name already exists")
    }

    const admin = await Admin.create({
        name,
        email,
        password,
        phone
    })

    const createdadmin = await Admin.findById(admin._id).select(
        "-password -refreshToken -phone"
    )

    if (!createdadmin) {
        throw new ApiError(500, "Something went wrong while registering the Admin")
    }

    return res.status(201).json(
        new ApiResponse(201, createdadmin, "Admin registered Successfully")
    )

})

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        throw new ApiError(400, " email is required")
    }
    // if (!(name || email)) {
    //     throw new ApiError(400, "username or email is required")
    // }

    const admin = await Admin.findOne({email})

    if (!admin) {
        throw new ApiError(404, "Admin does not exist")
    }

    const isPasswordValid = await admin.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid Admin password")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(admin._id);

    const loggedInAdmin = await Admin.findById(admin._id).select("-password -refreshToken -phone");

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    loggedInAdmin, accessToken, refreshToken
                },
                "Admin login In Successfully"
            )
        )
})



let getlistadmin = asyncHandler(async (req, res) => {
    const admin = await Admin.find().select("-password -refreshToken ");
    if (!admin) {
        throw new ApiError(400, "Admin Empty")
    }
    res.status(201).json(
        new ApiResponse(201, admin, "Admin get Successfully")
    )
})

module.exports = { register, loginAdmin, getlistadmin }