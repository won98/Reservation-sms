const {
  User,
  Item,
  Shop,
  sequelize,
  Reservation,
  Reservationinfo,
  Op,
} = require("../models");
const jwt = require("../utils/jwt");
const shortid = require("shortid");
const sms = require("../utils/Sms");
const svc = require("../service");

module.exports = {
  Reservation: async (req, res) => {
    try {
      let reply = await svc.R.ReservationServer(req.body);
      let replyjson = {
        result: "success",
      };
      return res.status(200).json(replyjson);
    } catch (err) {
      console.log(err);
      return res.status(200).json(err);
    }
  },
  Registrationlist: async (req, res) => {
    try {
      const { xauth } = req.body;
      let decoded = jwt.verifyToken(xauth);
      let data = [decoded.id];
      //console.log(data);
      const query = `select * from shop left outer join item 
      on shop.shop_id = item.shop_id inner join reservation on item.item_id = reservation.item_id 
      where reservation.user_id = ?`;

      const row = await sequelize.query(query, { replacements: data });
      return res.status(200).json({
        result: "success",
        result: row[0],
      });
    } catch (err) {
      console.log(err);
    }
  },
  Cancel: async (req, res) => {
    try {
      let reply = await svc.R.CancleServer(req.body);
      console.log(reply);
      let replyjson = {
        result: "success",
      };
      return res.status(200).json(replyjson);
    } catch (err) {
      console.log(err);
      return res.stats(200).json(err);
    }
  },
};
// findAll 에 raw:true 조건추가
// const keyword = await PrivateApt.findAll({attributes:['houseName'], raw:true})
//예약하기전에 가게와 상품이 있는지 체크
