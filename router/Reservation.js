const express = require("express");
const { ReservationController: controller } = require("../controller");
const router = express.Router();

router.post("/reservation", controller.Reservation);
router.post("/registrationlist", controller.Registrationlist);
router.post("/cancle", controller.Cancel);
module.exports = router;
