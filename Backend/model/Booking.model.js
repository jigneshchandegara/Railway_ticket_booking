let mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    trainScheduleId: {
        type: String,
        required: true
    },
    passenger: [
        {
            passengername: {
                type: String,
                required: true
            },
            passengerAge: {
                type: Number,
                required: true
            },
            passengerGender: {
                type: String,
                required: true
            },
            passengerContact: {
                type: String,
                required: true
            },

        }
    ],
    Numberofseat: {
        type: Number,
        required: true
    },
    selectClass: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Confirmed', 'Waiting', 'Cancelled'],
        default: 'Waiting'
    },
    bookingDate: {
        type: String,
        default: Date.now
    },
    refundStatus: {
        type: String,
        enum: ['Pending', 'Processed'],
        // default: 'Pending'
    },
    cancellationReason: {
        type: String,
        // default: ''
    }
});

let Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking