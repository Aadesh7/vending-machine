const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./app/models");

var corsOptions = {
    origin: "http://localhost:8181"
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// db.sequelize.sync({force: true}).then(() => {
//   console.log("Drop and re-sync db.");
// });
db.sequelize.sync();

app.get("/", (req, res) => {
    res.json({ message: "Welcome to vending application." });
});

require("./app/routes/product.routes")(app);
require("./app/routes/vendor.routes")(app);

const PORT = process.env.PORT || 8180;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});