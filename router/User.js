const express = require("express");
const { UserController: controller } = require("../controller");
//const { MessageController: controller } = require("../controller");
const router = express.Router();

router.post("/signup", controller.Signup);
router.post("/login", controller.Login);
router.post("/emailcheck", controller.Checkemail);
router.post("/idcheck", controller.Checkid);
//router.post("/find", controller.Find);
module.exports = router;
