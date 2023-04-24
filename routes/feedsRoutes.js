const router = require("express").Router();
const { check, validationResult } = require('express-validator');
const feedController = require("../controller/feedController");
const Feeds = require("../models/feedsModal.js");

// GET Routes
router.get("/feeds", feedController.getFeeds);

// POST Routes
router.post("/feeds",[
    check('id').notEmpty(),
    check('mail').isEmail(),
    check('msg').notEmpty(),
  ], feedController.postFeeds);

module.exports = router;
