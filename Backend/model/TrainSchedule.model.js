const mongoose = require("mongoose");

const trainScheduleSchema = new mongoose.Schema({
    trainId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Traintype',
        required: true
    },
    classes: [
        {
            classname: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Classtype"
            },
        
        }
    ],
    departureStationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: true
    },
    arrivalStationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: true
    },
    departureTime: {
        type: String,
        required: true
    },
    arrivalTime: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    intermediateStations: [
        {
            stationId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Station'
            },
            arrivalTime: {
                type: String,
                required: true
            },
            departureTime: {
                type: String,
                required: true
            }
        }
    ],
    daysOfWeek: {
        type: [String],
        enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        required: true
    },
    active: { type: Boolean, default: true }
});

const TrainSchedule = mongoose.model("TrainSchedule", trainScheduleSchema)
module.exports = TrainSchedule;

