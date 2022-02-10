# vending-machine

Backend API collection for vending machine application.
Used Express JS as backend framework and Sequelize ORM for database connection. An sql file is provided in the main branch for ease of use during setup.
Postman collection with examples are provided here: https://www.getpostman.com/collections/c4e5d640dd13768d5048

- Users can add drinks(name, cost and stock) and retrieve drinks either all or using name as parameter.
- Users can buy or refund.
- The sql file provided has only three drinks coke, pepsi and dew according to requirement.

The entry file is server.js, so just use <i>node server.js</i> or <i>nodemon server.js</i> to run the application.
