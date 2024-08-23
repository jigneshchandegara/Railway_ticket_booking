const Train = require("../model/Train.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const traincreate = asyncHandler(async (req, res) => {
    const { train, classes } = req.body;


    if (!(train || classes)) {
        throw new ApiError(400, "train or classes is required")
    }

    const existedtrain = await Train.findOne({ train });
    if (existedtrain) {
        throw new ApiError(409, "train already exists")
    }

    if (!req.admin) {
        throw new ApiError(401, "Admin authentication required");
    }

    const trainlist = await Train.create({
        train,
        classes,
        createby: req.admin?._id
    });

    if (!trainlist) {
        throw new ApiError(500, "traintype creation failed, please try again");
    }

    return res.status(201).json(
        new ApiResponse(201, trainlist, "traintype created successfully")
    );
});

const trainid = asyncHandler(async (req, res) => {
    let { id } = req.params
    const trainlistid = await Train.findById(id).populate(["train", { path: "classes", populate: { path: "classname" } }])
    console.log(trainlistid);
    if (!trainlistid) {
        throw new ApiError(404, "train not found");
    }
    return res.status(200).json(new ApiResponse(200, trainlistid, "train found successfully"));
})

const trainget = asyncHandler(async (req, res) => {
    const traintlist = await Train.find().populate(["train", { path: "classes", populate: { path: "classname" } }]);
    if (!traintlist) {
        throw new ApiError(404, "train not found");
    }
    return res.status(200).json(new ApiResponse(200, traintlist, "train found successfully"))
})

const traindelete = asyncHandler(async (req, res) => {
    let { id } = req.params
    const train = await Train.findByIdAndDelete(id);
    if (!train) {
        throw new ApiError(404, "train not found");
    }
    return res.status(200).json(new ApiResponse(200, train, "train deleted successfully"))
})

// const trainupdata = asyncHandler(async (req, res) => {
//     let { id } = req.params;
//     let { train, classes } = req.body;

//     const updatatrain = await Train.findByIdAndUpdate(id, {
//         train,
//         classes,
//         updateby: req.admin?._id

//     }, {
//         new: true,
//     })
//     console.log();
//     if (!updatatrain) {
//         throw new ApiError(404, "train not updata");
//     }
//     return res.status(200).json(new ApiResponse(200, updatatrain, "train updata successfully"))
// })



module.exports = { traincreate, trainid, trainget, traindelete }