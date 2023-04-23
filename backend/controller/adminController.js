const UserModal = require("../models/userModal");

//GET Route


//POST Route
exports.postBlockUser = (req, res, next) => {
    UserModal.findOne({email: req.body.email}).then((user) => {
        if (!user) {
            return res.status(403).json({message: "User does not exists"})
        }
        user.blocked = true;
        user.save().then((result) => {
            console.log(result)
            return res.status(201).json({message: "User has been blocked!!!", result: result})
        });
    })
};

exports.postUnblockUser = (req, res, next) => {
    console.log(req.body.email+"hk")
    UserModal.findOne({email: req.body.email}).then((user) => {
        // console.log(user);
        if (!user) {
            return res.status(403).json({message: "User does not exists"})
        }
        user.blocked = false;
        user.save().then((result) => {
            console.log(result)
            return res.status(201).json({message: "User has been Unblocked!!!", result: result})
        });
    })
};

exports.deleteUser = (req, res, next) => {
    console.log(req.body.email);
    UserModal.deleteOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(403).json({ message: "User does not exist" });
            }
            return res.status(201).json({ message: "User has been deleted!!!", result: user });
        })
        .catch((err) => {
            return res.status(500).json({ error: err });
        });
};