const mysql = require("mysql");

// Mise place de la connexion en Local
const db = mysql.createConnection({
    host: "localhost",
    username: "root",
    password: "azerty",
    database: "groupomania",
});
db.connect(function(err) {
    if (err) throw err;
    console.log("CONNEXION  à la BD REUSSIE");
});
// export db
module.exports.getDB = () => {
    return db;
};