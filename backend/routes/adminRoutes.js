const router = require("express").Router();

const authController = require("../controller/adminController");

// POST Routes
router.put("/block-user", authController.postBlockUser)
router.put("/unblock-user", authController.postUnblockUser)
router.delete("/delete-user",authController.deleteUser)
module.exports = router;
