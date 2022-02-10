module.exports = app => {
    const products = require("../controllers/product.controller.js");
    var router = require("express").Router();
    
    // Create
    router.post("/product", products.create);
    
    // Retrieve all
    router.get("/product", products.findAll);

    // Retrieve one
    router.get("/product/:name", products.findOne);

    app.use('/api', router);
  };