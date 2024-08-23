const TrainSchedule = require("../model/TrainSchedule.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");


let Scheduletrain = asyncHandler(async (req, res) => {
    let {
        trainId,
        classes,
        departureStationId,
        arrivalStationId,
        departureTime,
        arrivalTime,
        date,
        intermediateStations,
        daysOfWeek,
        active
    } = req.body;
    console.log(req.body);

    // Check if required fields are present
    if (!(trainId || departureStationId || arrivalStationId || departureTime || arrivalTime || date || daysOfWeek)) {
        throw new ApiError(400, "All required fields must be provided.");
    }

    // const existedTrain = await TrainSchedule.findOne({ trainId });

    // if (existedTrain) {
    //     throw new ApiError(409, "A train schedule with this trainId already exists.");
    // }

    // Create a new train schedule
    const train = await TrainSchedule.create({
        trainId,
        classes,
        departureStationId,
        arrivalStationId,
        departureTime,
        arrivalTime,
        date,
        intermediateStations,
        daysOfWeek,
        active: active !== undefined ? active : true // Default to true if not provided
    });

    if (!train) {
        throw new ApiError(500, "Train schedule creation failed, please try again.");
    }

    return res.status(201).json(
        new ApiResponse(201, train, "Train schedule created successfully.")
    );
});




let getsheduletrain = asyncHandler(async (req, res) => {
    const trainlist = await TrainSchedule.find()
        .populate('trainId')
        .populate('classes.classname')
        .populate('departureStationId')
        .populate('arrivalStationId')
        .populate('intermediateStations.stationId')
    if (!trainlist) {
        throw new ApiError(404, "trainSchedule not found")
    }
    console.log(trainlist, "get data");

    res.status(200).json(
        new ApiResponse(200, trainlist, "trainSchedule get Successfully")
    )
})

let deleteScheduletrain = asyncHandler(async (req, res) => {
    const { id } = req.params
    const scheduletrain = await TrainSchedule.findByIdAndDelete(id)

    if (!scheduletrain) {
        throw new ApiError(404, "trainSchedule not found");
    }
    return res.status(200).json(new ApiResponse(200, scheduletrain, "trainSchedule deleted successfully"))
})

let updataScheduletrain = asyncHandler(async (req, res) => {
    let { id } = req.params;

    let { trainId, departureStationId, arrivalStationId, departureTime, arrivalTime, date, daysOfWeek, active } = req.body;

    let updatedScheduleTrain = await TrainSchedule.findByIdAndUpdate(
        id,
        {
            trainId,
            departureStationId,
            arrivalStationId,
            departureTime,
            arrivalTime,
            date,
            daysOfWeek,
            active
        },
        { new: true }
    );

    if (!updatedScheduleTrain) {
        throw new ApiError(404, "Train schedule not found");
    }

    return res.status(200).json(new ApiResponse(200, updatedScheduleTrain, "Train schedule updated successfully"));
});

let updataScheduletrainintermediateStations = asyncHandler(async (req, res) => {
    let { id } = req.params;
    let { intermediateStations } = req.body;
    let updatedScheduleTrain = await TrainSchedule.findByIdAndUpdate(id, { intermediateStations }, { new: true });
    if (!updatedScheduleTrain) {
        throw new ApiError(404, "Train schedule intermediateStations not found");
    }
    return res.status(200).json(new ApiResponse(200, updatedScheduleTrain, "Train schedule intermediateStations successfully"));
})

let updataScheduletrainclasses = asyncHandler(async (req, res) => {
    let { id } = req.params;
    let { classes } = req.body;
    let updatedScheduleTrain = await TrainSchedule.findByIdAndUpdate(id, { classes }, { new: true });
    if (!updatedScheduleTrain) {
        throw new ApiError(404, "Train schedule classes not found");
    }
    return res.status(200).json(new ApiResponse(200, updatedScheduleTrain, "Train schedule classes successfully"));
})

let searchtrain = asyncHandler(async (req, res) => {
    const { departureStationId, arrivalStationId, date } = req.query;
    console.log(req.query);

    // Validate input
    if (!departureStationId || !arrivalStationId || !date) {
        throw new ApiError(404, "Please provide both departureStationId and arrivalStationId.");
    }
    const schedules = await TrainSchedule.find({
        $and: [
            {
                $or: [
                    {
                        stationname: departureStationId.stationname,
                        stationname: arrivalStationId.stationname
                    },
                    {
                        intermediateStations: {
                            $elemMatch: {
                                stationId: {
                                    $in: [departureStationId.stationname, arrivalStationId.stationname] // Match any station ID
                                }
                            }
                        }
                    }
                ]
            },
            {
                date: date // Add your date condition here
            }
        ]
    })
        .populate('trainId')
        .populate('classes.classname')
        .populate('departureStationId')
        .populate('arrivalStationId')
        .populate('intermediateStations.stationId')

    if (schedules.length === 0) {
        throw new ApiError(404, 'No train schedules found.');
    }
    // console.log(schedules,"search");
    return res.status(200).json(new ApiResponse(200, schedules, "Train schedule serach successfully"));
})

module.exports = { Scheduletrain, getsheduletrain, deleteScheduletrain, updataScheduletrain, updataScheduletrainintermediateStations, updataScheduletrainclasses, searchtrain }




