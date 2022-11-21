const express = require("express");
const { ShopController: controller } = require("../controller");
const router = express.Router();

router.post("/registration", controller.Registration);
router.post("/login", controller.Login);
module.exports = router;
