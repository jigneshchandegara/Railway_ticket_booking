let express = require("express");
const verifyJWT = require("../middleware/auth.middleware");
const { bookingpost, bookingfindid, bookingget, statusupdata, bookingcancelled } = require("../controller/Booking.controller");
let router = express.Router();

router.post("/createbooking", verifyJWT, bookingpost)
router.get("/getbyidbooking/:id", verifyJWT, bookingfindid);
router.get("/getbooking", verifyJWT, bookingget);
router.patch("/updatastatusbooking/:id", verifyJWT, statusupdata);
router.patch("/cancelledbooking/:id", verifyJWT, bookingcancelled);

module.exports = router