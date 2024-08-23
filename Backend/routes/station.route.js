let express = require("express");
const verifyJWT = require("../middleware/auth.middleware");
const { stationcreate, stationbyid, stationget, stationupdata, stationdelete } = require("../controller/Station.controller");
let router = express.Router();


router.post("/createstation", verifyJWT, stationcreate);
router.get("/stationbyid/:id", verifyJWT, stationbyid);
router.get("/stationget", verifyJWT, stationget);
router.delete("/stationdelete/:id", verifyJWT, stationdelete);
router.patch("/stationupdata/:id", verifyJWT, stationupdata);

module.exports = router