const express = require("express");
// const { start } = require("repl");

const ctrl = require("../../controllers/users/auth");

const { validation, auth } = require("../../middelwares");
// ,  upload

const { schemas } = require("../../models/user");

const router = express.Router();

// signup
router.post("/singup", validation(schemas.registerSchema), ctrl.register);

// router.get("/verify/:verificationToken", ctrl.verifyEmail);

// router.post("/verify", validation(schemas.emailSchema), ctrl.resendVerifyEmail);

// signin
router.post("/signin", validation(schemas.loginSchema), ctrl.login);

router.get("/current", auth, ctrl.getCurrent);

router.post("/logout", auth, ctrl.logout);

// router.patch(
//   "/avatars"
//   auth,
//   upload.single("avatar"),
//   ctrl.updateAvatar
// );

module.exports = router;

// const express = require("express");

// const router = express.Router();

// router.post("/signup", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.post("/signin", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.get("/current", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.get("/logout", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// router.patch("/:id/subscription", async (req, res, next) => {
//   res.json({ message: "template message" });
// });

// module.exports = router;
