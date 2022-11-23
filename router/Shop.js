const express = require("express");
const { ShopController: controller } = require("../controller");
const imageupload = require("../utils/multer");
const router = express.Router();

router.post(
  "/registration",
  imageupload.single("img"),
  controller.Registration
);
router.post("/login", controller.Login);
module.exports = router;
