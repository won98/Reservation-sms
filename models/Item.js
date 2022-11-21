module.exports = (sequelize, DataTypes) => {
  const Item = sequelize.define(
    "Item",
    {
      id: {
        type: DataTypes.STRING(11),
        primaryKey: true,
        allowNull: false,
      },
      shop_id: {
        type: DataTypes.STRING(11),
        allowNull: false,
      },
      item_id: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false, // createAt, updateAt 활성화
      paranoid: false, // deleteAt 옵션
    }
  );

  return Item;
};
