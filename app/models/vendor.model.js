module.exports = (sequelize, Sequelize) => {
    const Vendor = sequelize.define("vendor", {
        amount: {
            type: Sequelize.FLOAT
        }
    });
    return Vendor;
}