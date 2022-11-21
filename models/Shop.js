module.exports = (sequelize, DataTypes) => {
  const Shop = sequelize.define(
    "Shop",
    {
      id: {
        type: DataTypes.STRING(11),
        primaryKey: true,
        allowNull: false,
      },
      shop_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
        unique: true,
      },
      shop_num: {
        type: DataTypes.STRING(13),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false, // createAt, updateAt 활성화
      paranoid: false, // deleteAt 옵션
    }
  );

  return Shop;
};
