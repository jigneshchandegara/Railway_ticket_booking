const express = require("express");
const { traincreate, trainid, trainget, traindelete } = require("../controller/Train.controller");
const verifyJWT = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/createtrain", verifyJWT, traincreate);
router.get("/getbyidtrain/:id", verifyJWT, trainid);
router.get("/gettrain", verifyJWT, trainget);
router.delete("/deletetrain/:id", verifyJWT, traindelete);
// router.put("/updatatrain/:id", verifyJWT, trainupdata);

module.exports = router