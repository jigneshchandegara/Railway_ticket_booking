let express = require("express")
const { register, loginAdmin, getlistadmin } = require("../controller/Admin.controller");
const verifyJWT = require("../middleware/auth.middleware");
let router = express.Router()


router.post("/register", register);
router.post("/login_Admin", loginAdmin);
router.get("/get_admin_list", verifyJWT, getlistadmin)

module.exports = router