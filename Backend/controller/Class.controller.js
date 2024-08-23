const Classtype = require("../model/class.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const createClass = asyncHandler(async (req, res) => {
    const { classname, setnumber } = req.body;

    if ([classname, setnumber].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required")
    }

    const existedclass = await Classtype.findOne({ classname });
    console.log(existedclass, "existed");

    if (existedclass) {
        throw new ApiError(409, "Class already exists");
    }

    if (!req.admin) {
        throw new ApiError(401, "Admin authentication required");
    }
    
    const classCreate = await Classtype.create({
        classname,
        setnumber,
        createby: req.admin?._id
    });

    if (!classCreate) {
        throw new ApiError(500, "failed to create classCreate");
    }

    return res.status(201).json(
        new ApiResponse(201, classCreate, "Class created successfully")
    );
});

const getClass = asyncHandler(async (req, res) => {
    const classget = await Classtype.find()
    if (!classget) {
        throw new ApiError(404, "Class Empty")
    }
    return res.status(200).json(
        new ApiResponse(200, classget, "Class fetched successfully")
    );
})
const deleteClass = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const classdelete = await Classtype.findByIdAndDelete(id);
    if (!classdelete) {
        throw new ApiError(404, "Class not found")
    }
    return res.status(200).json(
        new ApiResponse(200, classdelete, "Class deleted successfully")
    );
})

const updataClass = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { classname, setnumber } = req.body;
    const classupdate = await Classtype.findByIdAndUpdate(id, { $set: { classname, setnumber } }, { new: true });
    if (!classupdate) {
        throw new ApiError(404, "Class not found")
    }
    return res.status(200).json(
        new ApiResponse(200, classupdate, "Class updated successfully")
    );
})

module.exports = { createClass, getClass, deleteClass, updataClass }