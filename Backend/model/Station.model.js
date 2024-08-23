let mongoose = require("mongoose");

const StationSchema = new mongoose.Schema({
    stationname: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    createby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin',
    }
},
    {
        timestamps: true
    }
);

let Station = mongoose.model("Station", StationSchema);
module.exports = Station;

