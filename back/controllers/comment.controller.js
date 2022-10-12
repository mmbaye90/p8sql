const dbc = require("../config/db");
const db = dbc.getDB();
const jwt = require("jsonwebtoken");

exports.createComment = (req, res, next) => {
    const { message, post_id, author_id } = req.body;
    if (message.length <= 0 || message.length > 200) return null;

    const sql = `INSERT INTO comments (post_id, author_id, message) VALUES (?, ?, ?);`;
    db.query(sql, [post_id, author_id, message], (err, result) => {
        if (err || message.length === 0 || message.length >= 200) {
            res.status(404).json({ err });
            console.log(err);
            throw err;
        }
        res.status(200).json(result);
    });
};

exports.getOneComment = (req, res) => {
    const commentId = req.params.id;
    const sql = `SELECT * FROM comments WHERE comments.id = ?;`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(200).json(result);
    });
};

exports.getAllComments = (req, res) => {
    const postId = req.params.id;
    const sql = `SELECT id, message, created_At, \
    updated_At, likes, author_id, user_firstname, user_lastname, user_picture FROM comments \
    INNER JOIN users ON comments.author_id=users.user_id WHERE comments.post_id = ?;`;
    db.query(sql, [postId], (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(200).json(result);
    });
};

exports.deleteOneComment = (req, res) => {
    const { jwt: token } = req.cookies;
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const { user_id, admin } = decodedToken;
    const comment_id = req.params.id;

    const sql = `DELETE c FROM comments AS c
  INNER JOIN users AS u
  ON (u.user_id = c.author_id)
  WHERE c.id = ? AND (? = 1 OR u.user_id = ?);`;
    db.query(sql, [comment_id, admin, user_id], (err, result) => {
        if (err) {
            res.status(404).json({ err });
            throw err;
        }
        res.status(200).json(result);
    });
};