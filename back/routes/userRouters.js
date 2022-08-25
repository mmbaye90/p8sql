const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/usersCtrllers");
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer_config");

//********************************************* Les routes de l'API *******************************************/
//Inscription
router.post("/register", userCtrl.signup);

//Connexion
router.post("/login", userCtrl.login);