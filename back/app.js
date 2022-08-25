const express = require("express");
const app = express();
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const path = require("path");
const mysql = require("mysql");
const userRoutes = require("./routes/userRouters");

// Cors (need to create a config file for better lisibility)
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(helmet());
app.use(express.json());
app.use(cookieParser());

// app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes files
// const postRoutes = require("./routes/post.routes");
// const commentRoutes = require("./routes/comment.routes");

// Routes
// app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); //chemin d'enregistrement et de login du user
// app.use("/api/post", postRoutes);
// app.use("/api/comment", commentRoutes);

module.exports = app;