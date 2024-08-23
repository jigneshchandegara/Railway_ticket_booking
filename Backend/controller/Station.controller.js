const Station = require("../model/Station.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const stationcreate = asyncHandler(async (req, res) => {
    const { stationname, location } = req.body;

    if ([stationname, location].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedstation = await Station.findOne({ stationname });
    if (existedstation) {
        throw new ApiError(409, "station already exists")
    }

    if (!req.admin) {
        throw new ApiError(401, "Admin authentication required");
    }

    const station = await Station.create({
        stationname,
        location,
        createby: req.admin?._id
    });

    if (!station) {
        throw new ApiError(500, "Station creation failed, please try again");
    }

    return res.status(201).json(
        new ApiResponse(201, station, "Station created successfully")
    );
});

const stationbyid = asyncHandler(async (req, res) => {
    let { id } = req.params
    const station = await Station.findById(id).populate('stationname');
    if (!station) {
        throw new ApiError(404, "Station not found");
    }
    return res.status(200).json(new ApiResponse(200, station, "Station found successfully"));
})
const stationget = asyncHandler(async (req, res) => {
    const station = await Station.find();
    if (!station) {
        throw new ApiError(404, "Station not found");
    }
    return res.status(200).json(new ApiResponse(200, station, "Station found successfully"))
})
const stationdelete = asyncHandler(async (req, res) => {
    let { id } = req.params
    const station = await Station.findByIdAndDelete(id);
    if (!station) {
        throw new ApiError(404, "Station not found");
    }
    return res.status(200).json(new ApiResponse(200, station, "Station deleted successfully"))
})

const stationupdata = asyncHandler(async (req, res) => {
    let { id } = req.params;
    let { stationname, location } = req.body;
    const station = await Station.findByIdAndUpdate(id, {
        stationname,
        location,
    }, {
        new: true,
    })
    if (!station) {
        throw new ApiError(404, "Station not updata");
    }
    return res.status(200).json(new ApiResponse(200, station, "station updata successfully"))
})



module.exports = { stationcreate, stationbyid, stationget, stationdelete,stationupdata }