const express = require("express");
const app = express();
const port = 1200;
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const Router = require("./router");
const { sequelize, Reservation } = require("./models");
const sms = require("./utils/Sms");
const test = require("./controller/Reservation");
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("OK");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", Router.UserRoute);
app.use("/shop", Router.ShopRoute);
app.use("/item", Router.ItemRoute);
app.use("/reservation", Router.ReservationRoute);
//app.use("/sms", Router.SmsRoute);
//app.use("/message", Router.MessageRoute);

//
// const job = setInterval(async () => {
//   const date = new Date();
//   const year = date.getFullYear();
//   const month = ("0" + (date.getMonth() + 1)).slice(-2);
//   const day = ("0" + date.getDate()).slice(-2);
//   const dateStr = year + "-" + month + "-" + day;
//   console.log(dateStr.toLocaleString());
//   const row1 = await Reservation.findAll({
//     where: {
//       date: dateStr.toLocaleString(),
//       check: false,
//     },
//   });
//   // reservation
//   for (let i = 0; i < row1.length; i++) {
//     if (row1[i].check == false) {
//       let name = row1[i].user_name;
//       const shop = row1[i].shop_id;
//       const number = row1[i].number;
//       const send = await sms.Tomorrow({
//         name: name,
//         shop: shop,
//         number: number,
//       });
//     }
//     const row2 = await Reservation.update(
//       {
//         check: true,
//       },
//       { where: { date: dateStr.toLocaleString() } }
//     );
//   }
// }, 6000);

// const job = setInterval(() => {
//   send.Tomorrow();
// }, 6000);
app.listen(port, () => {
  //job();
  console.log(port, "실행");
});
