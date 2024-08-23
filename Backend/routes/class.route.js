let express = require("express");
const { createClass, getClass, deleteClass, updataClass } = require("../controller/Class.controller");
const verifyJWT = require("../middleware/auth.middleware");
let router = express.Router();

router.post("/create_class", verifyJWT, createClass);
router.get("/classlistget", verifyJWT, getClass);
router.delete("/classdelete/:id", verifyJWT, deleteClass);
router.patch("/classupdata/:id", verifyJWT, updataClass);

module.exports = router;

//General Class
//Sleeper Class
// Second Seating AC
//Three Tier Air Conditioned Class (3A)
//Two Tier Air Conditioned Class (2AC)
//First Class Air Conditioned (1AC)
//Executive Air Conditioned Chair Car (1A)