const express = require("express");
const { ItemController: controller } = require("../controller");
const router = express.Router();

router.post("/registration", controller.Registration);
module.exports = router;
