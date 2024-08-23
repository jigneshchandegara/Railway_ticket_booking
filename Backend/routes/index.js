let express = require("express");
let routers = express.Router();
let AdminRoute = require("./Admin.route");
let UserRoute = require("./user.route");
let ClassRoute = require("./class.route");
let StationRoute = require("./station.route");
let TraintypeRoute = require("./traintype.route");
let TrainRoute = require("./Train.route");
let TrainScheduleRoute = require("./TrainSchedule.route");
let BookingRoute = require("./Booking.route");

routers.use("/Admin", AdminRoute);
routers.use("/User", UserRoute);
routers.use("/Class", ClassRoute);
routers.use("/Station", StationRoute);
routers.use("/Traintype", TraintypeRoute);
routers.use("/Train", TrainRoute);
routers.use("/TrainSchedule", TrainScheduleRoute);
routers.use("/Booking", BookingRoute);


module.exports = routers