const db = require("../models");
const Product = db.products;
// const Op = db.Sequelize.Op;

// Create product
exports.create = (req, res) => {
    if (!req.body.name || !req.body.cost || !req.body.stock) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
    }

    const product = {
        name: req.body.name.toUpperCase(),
        cost: req.body.cost,
        stock: req.body.stock
    };

    Product.create(product).then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Product."
        });
    });
};

// Retrieve all
exports.findAll = (req, res) => {
    Product.findAll().then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving products."
        });
    });
};

// Find one
exports.findOne = (req, res) => {
    const name = req.params.name.toUpperCase();
    Product.findOne({
        where: {name: name}
    }).then(data => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                mesage: "Cannot find product with name " + req.params.name
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Error retrieving product with name" + req.params.name
          });
    })
};