const Traintype = require("../model/Traintype.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const traintypecreate = asyncHandler(async (req, res) => {
    const { trainnumber, traintypename } = req.body;

    if ([trainnumber, traintypename].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedtraintypename = await Traintype.findOne({ traintypename });
    if (existedtraintypename) {
        throw new ApiError(409, "traintype already exists")
    }

    if (!req.admin) {
        throw new ApiError(401, "Admin authentication required");
    }

    const traintype = await Traintype.create({
        trainnumber,
        traintypename,
        createby: req.admin?._id
    });

    if (!traintype) {
        throw new ApiError(500, "traintype creation failed, please try again");
    }

    return res.status(201).json(
        new ApiResponse(201, traintype, "traintype created successfully")
    );
});

const traintypeid = asyncHandler(async (req, res) => {
    let { id } = req.params
    const traintype = await Traintype.findById(id).populate('traintypename');
    if (!traintype) {
        throw new ApiError(404, "traintype not found");
    }
    return res.status(200).json(new ApiResponse(200, traintype, "traintype found successfully"));
})

const traintypeget = asyncHandler(async (req, res) => {
    const traintype = await Traintype.find();
    if (!traintype) {
        throw new ApiError(404, "traintype not found");
    }
    return res.status(200).json(new ApiResponse(200, traintype, "traintype found successfully"))
})

const traintypedelete = asyncHandler(async (req, res) => {
    let { id } = req.params
    const traintype = await Traintype.findByIdAndDelete(id);
    if (!traintype) {
        throw new ApiError(404, "traintype not found");
    }
    return res.status(200).json(new ApiResponse(200, traintype, "traintype deleted successfully"))
})

const traintypeupdata = asyncHandler(async (req, res) => {
    let { id } = req.params;
    let { trainnumber, traintypename } = req.body;
    const traintype = await Traintype.findByIdAndUpdate(id, {
        trainnumber,
        traintypename,
        updateby: req.admin?._id

    }, {
        new: true,
    })
    if (!traintype) {
        throw new ApiError(404, "Traintype not updata");
    }
    return res.status(200).json(new ApiResponse(200, traintype, "traintype updata successfully"))
})



module.exports = { traintypecreate, traintypeid, traintypeget, traintypedelete, traintypeupdata }