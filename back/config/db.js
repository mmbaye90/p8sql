const mysql = require("mysql");

// Mise place de la connexion
const db = mysql.createConnection({
    host: "localhost",
    username: "root",
    password: "azerty",
    database: "groupomania",
});

// export db
module.exports.getDB = () => {
    return db;
};