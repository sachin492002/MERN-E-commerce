const router = require("express").Router();
const { check, validationResult } = require('express-validator');
const uploads = require("../middlewares/uploads");
const userController = require("../controller/userController");

// GET Routes
router.get("/usersBlocked", userController.getBlockedUsers);
router.get("/usersAll", userController.getUsers);
router.get("/user/:id", userController.getUserById);

// POST Routes
router.post("/user",userController.postUser);
router.post("/userUpdate",userController.postUpdateUser);
router.post("/users", [
    check('name').notEmpty(),
    check('password').isLength({ min: 6 }),
    check('email').isEmail(),
    check('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    })
  ], uploads.imageUpload.single("profile-pic"), userController.postRegister);

module.exports = router;
