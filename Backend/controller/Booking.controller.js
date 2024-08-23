const Booking = require("../model/Booking.model");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

let bookingpost = asyncHandler(async (req, res) => {
    let { trainScheduleId, passengerId, Numberofseat, selectClass,status, bookingDate } = req.body

    if (!(trainScheduleId || passengerId || Numberofseat || selectClass || bookingDate)) {
        throw new ApiError(400, "All required fields must be provided")
    }

    if (!req.user) {
        throw new ApiError(401, "User authentication required");
    }

    const booking = await Booking.create({
        trainScheduleId,
        passengerId ,
        Numberofseat,
        selectClass,
        status,
        bookingDate
    });

    if (!booking) {
        throw new ApiError(500, "booking creation failed, please try again");
    }
    return res.status(201).json(
        new ApiResponse(201, booking, "Booking successfully")
    );
})

const bookingfindid = asyncHandler(async (req, res) => {
    let { id } = req.params
    const bookinglistid = await Booking.findById(id)
        .populate({
            path: 'trainScheduleId',
            select: 'trainId  ',
            populate: {
                path: 'trainId',
                select: 'trainnumber traintypename createby'
            }
        })
        .populate({
            path: 'trainScheduleId',
            select: 'trainId classes ',
            populate: {
                path: 'classes.classname',
                select: 'classname setnumber createby'
            }
        })
        .populate({
            path: 'trainScheduleId',
            select: 'trainId  departureStationId ',
            populate: {
                path: 'departureStationId',
                select: 'stationname location'
            }
        })
        .populate({
            path: 'trainScheduleId',
            select: 'trainId arrivalStationId intermediateStations',
            populate: {
                path: 'arrivalStationId',
                select: 'stationname location'
            }
        })
        .populate({
            path: 'trainScheduleId',
            select: 'trainId  intermediateStations',
            populate: {
                path: 'intermediateStations.stationId',
                select: 'stationname location createby',
            }
        })
        .populate('passengerId')
        .populate('selectClass.classname');

    console.log(bookinglistid);
    if (!bookinglistid) {
        throw new ApiError(404, "booking not found");
    }
    return res.status(200).json(new ApiResponse(200, bookinglistid, "booking found successfully"));

})


let bookingget = asyncHandler(async (req, res) => {
    const bookingget = await Booking.find()
        .populate({
            path: 'trainScheduleId',
            select: 'trainId  ',
            populate: {
                path: 'trainId',
                select: 'trainnumber traintypename createby'
            }
        })
        .populate({
            path: 'trainScheduleId',
            select: ' classes ',
            populate: {
                path: 'classes.classname',
                select: 'classname setnumber createby'
            }
        })
        .populate({
            path: 'trainScheduleId',
            select: ' departureStationId ',
            populate: {
                path: 'departureStationId',
                select: 'stationname location'
            }
        })
        .populate({
            path: 'trainScheduleId',
            select: 'arrivalStationId ',
            populate: {
                path: 'arrivalStationId',
                select: 'stationname location'
            }
        })
        .populate({
            path: 'trainScheduleId',
            select: 'intermediateStations',
            populate: {
                path: 'intermediateStations.stationId',
                select: 'stationname location createby',
            }
        })
        .populate('passengerId')
        .populate('selectClass.classname');
    // .populate({
    //     path: 'selectClass.classname',
    //     select: 'classname setnumber createby ',
    //     populate: {
    //         path: 'selectClass.classname',
    //         select: 'classname setnumber createby',
    //     }
    // });

    if (!bookingget) {
        throw new ApiError(404, "booking not found");
    }
    return res.status(200).json(new ApiResponse(200, bookingget, "successfully booking"));

})

// let bookingstatus = asyncHandler(async (req, res) => {
//     const trainId = req.params.trainId;
//     const bookings = await Booking.find({ trainScheduleId: trainId });

//     const totalBookings = bookings.length;
//     const confirmed = bookings.filter(b => b.status === 'Confirmed').length;
//     const waiting = bookings.filter(b => b.status === 'Waiting').length;
//     const cancelled = bookings.filter(b => b.status === 'Cancelled').length;

//     return res.status(200).json(new ApiResponse(200, { totalBookings, confirmed, waiting, cancelled }, "successfully booking"));
// })

let statusupdata = asyncHandler(async (req, res) => {
    let { id } = req.params;
    console.log(id);
    let { status } = req.body
    if (!status) {
        throw new ApiError(400, "status is required");
    }
    const booking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    console.log(booking);
    if (!booking) {
        throw new ApiError(404, "booking not found");
    }
    return res.status(200).json(new ApiResponse(200, booking, "successfully booking status update"));

})

let bookingcancelled = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { reason } = req.body;

    const bookingfind = await Booking.findById(id).populate('passengerId');
    if (!bookingfind) {
        throw new ApiError(400, "status is required");
    }
    const booking = await Booking.findByIdAndUpdate(id, { status: '', reason }, {
        new: true,
        runValidators: true
    });
    console.log(booking, 'cancelled');
    if (!booking) {
        throw new ApiError(404, "booking not found");
    }



    const passengerEmail = bookingfind.passengerId.email;
    console.log(passengerEmail, "jhg");

    return res.status(200).json(new ApiResponse(200, booking, "successfully booking cancelled"));


    // Update the booking status and reason
    // booking.status = 'Cancelled';
    // booking.refundStatus = 'Processed';
    // booking.cancellationReason = reason;
    // await booking.save();

    // Send cancellation email
    // sendCancellationEmail(passengerEmail, reason);

    // res.send('Booking cancelled and refund processed');
})


module.exports = { bookingpost, bookingfindid, bookingget, statusupdata, bookingcancelled }