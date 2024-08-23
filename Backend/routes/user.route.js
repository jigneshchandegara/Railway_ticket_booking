let express = require("express");
const { upload } = require("../middleware/multer");
const { registeruser, loginuser, changeCurrentPassword, getCurrentUserlogin, updateAccountDetails, updateUserprofile, getAllUsers, deleteUser } = require("../controller/User.controller");
const verifyJWT = require("../middleware/auth.middleware");
let router = express.Router();

router.post("/User_create", upload.single("profile"), registeruser);
router.post("/User_login", loginuser);
router.post("/changeCurrentPassword", verifyJWT, changeCurrentPassword);
router.get("/getCurrentUserlogin", verifyJWT, getCurrentUserlogin);

router.patch('/updateAccountDetails', verifyJWT, updateAccountDetails);
router.patch("/profileupdata", verifyJWT, upload.single("profile"), updateUserprofile);
router.get("/getAlluser", verifyJWT, getAllUsers);
router.delete("/deleteUser/:id",deleteUser)



module.exports = router