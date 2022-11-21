const { Item, sequelize, Reservation, Shop } = require("../models");
const shortid = require("shortid");

module.exports = {
  Registration: async (req, res) => {
    try {
      const { item_id, shop_id } = req.body;
      const tx = await sequelize.transaction();
      const shorid = shortid.generate();
      // let decoded = jwt.verifyToken(sxauth);
      const row2 = await Shop.findOne(
        {
          where: { shop_id: shop_id },
        },
        {
          transaction: tx,
        }
      );
      const rows = await Item.create({
        id: shorid,
        shop_id: row2.id,
        item_id: item_id,
      });
      await tx.commit();
      return res.status(200).json({
        result: "success",
        result: rows,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
