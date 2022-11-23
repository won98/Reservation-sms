const express = require("express");
const { ItemController: controller } = require("../controller");
const imageupload = require("../utils/multer");
const router = express.Router();

router.post(
  "/registration",
  imageupload.single("img"),
  controller.Registration
);
module.exports = router;
