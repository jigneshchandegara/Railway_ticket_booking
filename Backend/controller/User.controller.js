const User = require("../model/user.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const uploadOnCloudinary = require("../utils/cloudinary");

const generateAccessAndRefereshTokens = async (adminid) => {
    try {
        const user = await User.findById(adminid)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}


let registeruser = asyncHandler(async (req, res) => {

    let { username, age, gender, email, phone, proof, password } = req.body;
    if ([username, age, gender, email, phone, proof, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existeduser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existeduser) {
        throw new ApiError(409, "user with email or name already exists")
    }

    const profileLocalPath = req.file.path;
    // console.log(profileLocalPath, "image");

    if (!profileLocalPath) {
        throw new ApiError(400, "profile image file is required")
    }

    const profileimage = await uploadOnCloudinary(profileLocalPath);


    const user = await User.create({
        username,
        profile: profileimage.url,
        age,
        gender,
        email,
        phone,
        proof,
        password
    })
    console.log(user, "user");

    const createduser = await User.findById(user._id).select(
        "-password -refreshToken "
    )
    if (!createduser) {
        throw new ApiError(500, "Something went wrong while registering the Admin")
    }
    return res.status(201).json(
        new ApiResponse(201, createduser, "user registered Successfully")
    )

})

const loginuser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username && !email) {
        throw new ApiError(400, "name or email is required")
    }
    // if (!(name || email)) {
    //     throw new ApiError(400, "username or email is required")
    // }


    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(404, "user does not exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid User password")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);
    // console.log(accessToken, "token");
    // console.log( refreshToken, "token");

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken -phone  -age -gender -proof -profile");

    const options = {
        httpOnly: true,
        secure: true
    }

    // console.log(loggedInUser,"login");

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    loggedInUser, accessToken, refreshToken
                },
                "User logged In Successfully"
            )
        )
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    const user = await User.findById(req.user?._id)
    console.log(user);
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid old password")
    }

    user.password = newPassword
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const getCurrentUserlogin = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(
            200,
            req.user,
            "User fetched successfully"
        ))
})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { username, age, gender, email, phone, proof } = req.body

    if (!username || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                username,
                age,
                gender,
                email,
                phone,
                proof
            }
        },
        { new: true }

    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"))
});

const updateUserprofile = asyncHandler(async (req, res) => {
    const profileimage = req.file?.path

    if (!profileimage) {
        throw new ApiError(400, "profile image file is missing")
    }

    const image = await uploadOnCloudinary(profileimage)

    if (!image.url) {
        throw new ApiError(400, "Error while uploading on profile image")

    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                profile: image.url
            }
        },
        { new: true }
    ).select("-password")

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "profile image updated successfully")
        )
})

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    return res.status(200).json(new ApiResponse(200, users, "All user details"));
});


const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    return res.status(200).json(new ApiResponse(200, user, "User deleted successfully"));
})





module.exports = { registeruser, loginuser, changeCurrentPassword, getCurrentUserlogin, updateAccountDetails, updateUserprofile, getAllUsers ,deleteUser }