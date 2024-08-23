let express = require('express');
const verifyJWT = require('../middleware/auth.middleware');
const { traintypecreate, traintypeid, traintypeget, traintypedelete, traintypeupdata } = require('../controller/Traintype.controller');
let router = express.Router();

router.post("/createtraintype", verifyJWT, traintypecreate);
router.get("/traintypebyid/:id", verifyJWT, traintypeid);
router.get("/gettraintype", verifyJWT, traintypeget);
router.delete("/deletetraintype/:id", verifyJWT, traintypedelete);
router.patch("/updatatraintype/:id", verifyJWT, traintypeupdata);


module.exports = router