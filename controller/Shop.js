const { Shop, sequelize, Reservation } = require("../models");
const shortid = require("shortid");
const jwt = require("../utils/jwt");
const { multer, cloudFront } = require("../utils");

module.exports = {
  Registration: async (req, res) => {
    try {
      const { shop_id, shop_num } = req.body;
      let image = req.file.location;
      const shopid = shortid.generate();
      let token = jwt.createToken({
        id: shop_id,
        shop_id: shop_id,
      });
      let rtoken = jwt.refreshtoken({
        id: shop_id,
      });
      const row = await Shop.create({
        id: shopid,
        shop_id: shop_id,
        shop_num: shop_num,
        img: cloudFront.URL(image),
        shop_refreshtoken: rtoken,
      });

      return res.status(200).json({
        result: "success",
        result: row,
        sxauth: token,
        srxauth: rtoken,
      });
    } catch (err) {
      console.log(err);
    }
  },
  Login: async (req, res) => {
    try {
      const { shop_id } = req.body;
      let token;
      let rtoken;
      const rows = await Shop.findOne({
        where: { shop_id: shop_id },
      });

      token = jwt.createToken({
        shop_id: rows.shop_id,
        id: rows.shop_id,
      });
      rtoken = jwt.refreshtoken({ id: rows.shop_id });
      await Shop.update(
        {
          refreshtoken: rtoken,
        },
        {
          where: {
            id: rows.shop_id,
          },
        }
      );
      return res.status(200).json({ token: token, rtoken: rtoken });
    } catch (err) {
      console.log(err);
    }
  },
};
