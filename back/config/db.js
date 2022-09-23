const mysql = require("mysql");
require("dotenv").config();

// Mise place de la connexion en Local
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});
db.connect(function(err) {
    if (err) throw err;
    console.log("CONNEXION  à la BD REUSSIE");
});
// export db
module.exports.getDB = () => {
    return db;
};