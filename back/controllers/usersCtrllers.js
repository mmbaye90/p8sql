const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const dbc = require("../config/db");

//DEbut des functions
// Function Register user
exports.signup = async(req, res) => {
    try {
        const pwdRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        const mailRegex =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        //Je procéde au vérification du mail et du mdp avec des regex
        if (!mailRegex.test(req.body.email)) {
            return res
                .status(400)
                .json({ message: "Veuillez saisir un mail valide" });
        }
        if (!pwdRegex.test(req.body.password)) {
            return res.status(400).json({
                message: `MDP doit contenir 
        au minimun 8 caractères, au moins 1 majuscule,
        1 minuscule, 1 chiffre et 1 caractère spécial`,
            });
        }

        const { user_password: password } = req.body;

        // ====== Password encryption =========
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const user = {
            ...req.body,
            user_password: encryptedPassword,
        };
        const sql = "INSERT INTO users SET ?";
        const db = dbc.getDB();
        db.query(sql, user, (err, result) => {
            if (!result) {
                res.status(400).json({ message: "Cet user existe déjà" });
            } else {
                res.status(201).json({ message: "User created !" });
            }
        });
    } catch (err) {
        res.status(200).json({ message: "Inscription échouée", err });
    }
};

//****************Function signin ************* /
exports.login = (req, res) => {
    //===== Vérification de l'email dans la BD ======
    const { user_email, user_password: clearPassword } = req.body;
    const sql = `SELECT user_pseudo, user_bio, user_password, user_id, user_avatar FROM users WHERE user_email=?`;
    const db = dbc.getDB();
    db.query(sql, [user_email], async(err, results) => {
        if (err) {
            return res.status(404).json({ err });
        }

        // ===== Verification du mot de passe saisi et celui de la bd ======
        if (results[0]) {
            try {
                const { user_password: hashedPassword, user_id } = results[0];
                const match = await bcrypt.compare(clearPassword, hashedPassword);
                if (match) {
                    // Si oui on signe le token et on l'envoie au front
                    const maxAge = 1 * (24 * 60 * 60 * 1000);
                    const token = jwt.sign({ user_id }, process.env.SECRET_TOKEN, {
                        expiresIn: maxAge,
                    });
                    // on enleve le mot de passe de la réponse
                    delete results[0].user_password;

                    res.cookie("jwt", token);
                    res.status(200).json({
                        user: results[0],
                        token: jwt.sign({ userId: user_id }, process.env.JWT_TOKEN, {
                            expiresIn: "24h",
                        }),
                    });
                }
            } catch (err) {
                console.log(err);
                return res.status(400).json({ err });
            }
        } else if (results[0] && results[0].active === 0) {
            res.status(200).json({
                error: true,
                message: "Votre compte a été désactivé",
            });
        } else if (!results[0]) {
            res.status(200).json({
                error: true,
                message: "Mauvaise combinaison email / mot de passe",
            });
        }
    });
};