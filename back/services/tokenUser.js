const jwt = require("jsonwebtoken");

exports.getUserIdByToken = (token) => {
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
    const { user_id } = decodedToken;
    return user_id;
};