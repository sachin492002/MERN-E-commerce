const FeedsModal = require("../models/feedsModal.js");
const redis = require("redis");
require('./client')
const { clearHash } = require('./client')

// GET Methods
exports.getFeeds = async (req, res) => {
    try {
        const data = await FeedsModal.find().cache();
        res.status(200).json(data); 
    }catch (err) {
      console.log(err);
      res.status(404).json({ message: err });
    }
};

// POST Methods
exports.postFeeds = (req, res) => {
  clearHash('default')
  new FeedsModal({
    id: req.body.id,
    mail: req.body.mail,
    msg: req.body.msg,
  }).save();
  res.json({ message: "Feed added successfully" });
};