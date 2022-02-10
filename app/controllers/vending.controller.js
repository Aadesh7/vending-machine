const db = require("../models");
const Product = db.products;
const Vendor = db.vendors;

// buy
exports.buy = (req, res) => {
    if (!req.body.drinkName || !req.body.amount) {
        throw ('Content can not be empty!');
    }
    var data = Object();
    Vendor.findOne().then(vendor => {
        data.vendor = vendor.amount;
        // console.log("vendor amount: " + data.vendor);
        return Product.findOne({
            where: {name: req.body.drinkName.toUpperCase()}
        })
    }).then((product) => {
        // console.log("vendorAmount: " + data.vendor);
        if (!product) {
            throw ('No such drink available!');
        }
        
        if (product.stock === 0) {
            throw (product.name + " out of stock!");
        }

        if (req.body.amount < product.cost) {
            throw ("Insufficient amount entered!");
        }

        data.remainder = req.body.amount - product.cost;
        if (data.remainder!=0 && data.remainder>data.vendor){
            throw ("Insufficient coins in the machine!");
        }
        
        data.product = product;
        if (data.remainder > 0){
            data.message = "Here is your " + data.product.name + ", and change of " + data.remainder
        }
        else {
            data.message = "Here is your " + data.product.name + "."
        }
        product.stock -= 1;
        return product.save();
    }).then(() => {
        return Vendor.findOne();
    }).then((vendor) => {
        vendor.amount = vendor.amount + data.product.cost;
        return vendor.save();
    }).then(() => {
        return res.status(200).send({
            message: data.message
        });
    })
    .catch(err => {
        return res.status(500).send({
            message: "Error: " + err
        });
    });
};

// refund
exports.refund = (req, res) => {
    if (!req.body.drinkName) {
        throw ("Content can not be empty!");
    }

    var data = Object();
    Product.findOne({
        where: {name: req.body.drinkName.toUpperCase()}
    }).then((product) => {
        if (!product) {
            throw ("No such drink available!");
        }
        data.product = product;
        return Vendor.findOne();
    }).then((vendor) => {
        if (vendor.amount < data.product.cost){
            throw ("Insufficient coins in the machine!");
        }
        
        vendor.amount -= data.product.cost;
        return vendor.save();
    }).then(() => {
        return Product.findOne({
            where: {name: req.body.drinkName.toUpperCase()}
        });
    }).then((product) => {
        product.stock += 1;
        return product.save();
    }).then(() => {
        data.message = data.product.name + " has been refunded, here is your change of " + data.product.cost;
        return res.status(200).send({
            message: data.message
        })
    }).catch(err => {
        return res.status(500).send({
            message: "Error: " + err
        });
    })
};
