module.exports = app => {
    const vendors = require("../controllers/vending.controller.js");
    var router = require("express").Router();
    
    router.post("/vendor/buy", vendors.buy);
    router.post("/vendor/refund", vendors.refund);

    app.use('/api', router);
  };