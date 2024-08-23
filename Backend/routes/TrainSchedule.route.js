const express = require("express");
const verifyJWT = require("../middleware/auth.middleware");
const { Scheduletrain, getsheduletrain,  deleteScheduletrain, updataScheduletrain, updataScheduletrainintermediateStations, updataScheduletrainclasses, searchtrain } = require("../controller/TrainSchedule.controller");
const router = express.Router();

router.post("/createtrainschedule", verifyJWT, Scheduletrain);
router.get("/gettrainschedulelist",  getsheduletrain);
router.delete("/deletetrainschedule/:id", verifyJWT,deleteScheduletrain);
router.patch("/updatascheduletrain/:id", verifyJWT,updataScheduletrain);
router.patch("/updatascheduleintermediateStations/:id", verifyJWT,updataScheduletrainintermediateStations);
router.patch("/updatascheduleclasses/:id", verifyJWT,updataScheduletrainclasses);

//search
router.get("/train-Search", searchtrain);

module.exports = router

//GET http://localhost:8080/TrainSchedule/train-Search?departureStationId=YOUR_DEPARTURE_STATION_ID&arrivalStationId=YOUR_ARRIVAL_STATION_ID


