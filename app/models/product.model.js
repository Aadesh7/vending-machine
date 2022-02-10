module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      name: {
        type: Sequelize.STRING
      },
      cost: {
        type: Sequelize.FLOAT
      },
      stock: {
        type: Sequelize.INTEGER
      }
    });
    return Product;
};