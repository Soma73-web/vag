module.exports = (sequelize, DataTypes) => {
  const GalleryCategory = sequelize.define(
    "GalleryCategory",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: { type: DataTypes.STRING, allowNull: false },
    },
    {
      tableName: "categories", // Use the actual table name here
      timestamps: false,
    },
  );

  return GalleryCategory;
};
