const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dbc = require("../config/db");
const db = dbc.getDB();
const path = require("path");
const { getUserIdByToken } = require("../services/tokenUser");

exports.getOneUser = (req, res) => {
    const { id: user_id } = req.params;
    const sqlGetUser = `SELECT * FROM users WHERE users.user_id = "${user_id}";`;
    db.query(sqlGetUser, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        delete result[0].user_password;
        res.status(200).json(result);
    });
};

exports.updateOneUser = (req, res) => {
    if (req.file) {
        const { id: user_id } = req.params;
        const imageUrl = `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`;

        const sql = `UPDATE users SET user_picture = "${imageUrl}" WHERE users.user_id = "${user_id}";`;

        db.query(sql, (err, result) => {
            if (err) {
                res.status(404).json({ err });
                throw err;
            }
        });
    }
    const { user_description } = req.body;
    const { id: userId } = req.params;
    const sqlbio = `UPDATE users SET user_description ="${user_description}" WHERE users.user_id = "${userId}";`;
    db.query(sqlbio, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        if (result) {
            res.status(200).json(result);
        }
    });
};

exports.changePassword = (req, res, next) => {
    const user_id = getUserIdByToken(req.cookies.jwt);
    const { user_password: clearPassword, newPassword } = req.body;

    const sql = `SELECT user_password FROM users WHERE user_id="${user_id}"`;
    const db = dbc.getDB();

    db.query(sql, async(err, results) => {
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(newPassword, salt);

        // ===== Verify password with hash in DB ======
        if (results[0]) {
            try {
                const { user_password: hashedPassword } = results[0];
                const match = await bcrypt.compare(clearPassword, hashedPassword);
                if (!match)
                    return res.status(400).json({ message: "Mot de passe incorrect" });
                const sqlUpdatePass = `UPDATE users SET user_password="${encryptedPassword}" WHERE user_id=${user_id}`;
                db.query(sqlUpdatePass, (err, results) => {
                    if (err) {
                        res.status(404).json({ err });
                        throw err;
                    }
                    res.status(200).json(results);
                });
            } catch (err) {
                console.log(err);
                return res.status(400).json({ err: "Mot de passe incorrect" });
            }
        }
    });
};
exports.postProfilPicture = (req, res) => {
    const { jwt: token } = req.cookies;
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const { user_id } = decodedToken;
    const imageUrl = `${req.protocol}://${req.get("host")}/images/${
    req.file.filename
  }`;
    const sqlParams = [user_id, imageUrl];
    const sql = `INSERT INTO images(user_id,image_url)  VALUES ("${user_id}","${imageUrl}");`;
    const db = dbc.getDB();
    db.query(sql, sqlParams, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(200).json(result);
    });
};

exports.getProfilPicture = (req, res, next) => {
    const { id: user_id } = req.params;
    const sqlGetUser = `SELECT image_url FROM images WHERE images.user_id = "${user_id}" ORDER BY images.image_id desc;`;
    db.query(sqlGetUser, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(200).json(result);
    });
};