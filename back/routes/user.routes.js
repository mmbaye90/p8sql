const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controllers");
const auth = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer_config");

router.get("/:id", auth, userCtrl.getOneUser);
router.get("/image/:id", auth, userCtrl.getProfilPicture);
router.put("/:id", auth, upload.single("avatar"), userCtrl.updateOneUser);
router.put("/:id/password", auth, userCtrl.changePassword);
router.post(
    "/image",
    auth,
    upload.single("avatar"),
    userCtrl.postProfilPicture
);

module.exports = router;