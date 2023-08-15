const ProductModal = require('../models/productModal');
const redis = require('redis');
const jwt = require('jsonwebtoken')
require('./client');
const { clearHash } = require('./client');
// GET Methods
exports.getProducts = async (req, res) => {
  try {
    const data = await ProductModal.find();
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: err });
  }
};

exports.getSellerProducts = (req, res) => {
  const seller = req.params.seller;
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authorizedData) => {
    if (err) {
      console.log('ERROR: Could not connect to the protected route');
      res.sendStatus(403);
    } else {
      ProductModal.find({ seller: seller })
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          res.status(404).json({ message: err });
        });
    }
  });
};

exports.deleteProduct = (req, res) => {
  clearHash('default');
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authorizedData) => {
    if (err) {
      console.log('ERROR: Could not connect to the protected route');
      res.sendStatus(403);
    } else {
      ProductModal.deleteOne({ _id: req.body.id })
        .then((product) => {
          if (!product) {
            return res.status(403).json({ message: 'Product does not exist' });
          }
          return res
            .status(201)
            .json({ message: 'Product has been deleted!!!', result: product });
        })
        .catch((err) => {
          return res.status(500).json({ error: err });
        });
    }
  });
};
exports.getProduct = (req, res) => {
  const id = req.params.id;
  ProductModal.findById(id)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
};

// POST Methods
exports.postProduct = (req, res) => {
  clearHash('default');
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authorizedData) => {
    if (err) {
      console.log('ERROR: Could not connect to the protected route');
      res.sendStatus(403);
    } else {
      const product = new ProductModal({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        image: req.file?.path.toString().replace(/\\/g, '/'),
        category: req.body.category,
        company: req.body.company,
        seller: req.body.seller,
        stock: req.body.stock,
        reviews: req.body.reviews,
        stars: Math.random() * 2 + 3,
        reviews: Math.floor(Math.random(100)),
      });

      product
        .save()
        .then((result) =>
          res
            .status(200)
            .json({ message: 'Product has been added', result: result })
        )
        .catch((err) => {
          res.status(403).json({ message: err });
        });
    }
  });
};

exports.postRemoveProduct = (req, res) => {
  clearHash('default');
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authorizedData) => {
    if (err) {
      console.log('ERROR: Could not connect to the protected route');
      res.sendStatus(403);
    } else {
      const id = req.body.id;
      ProductModal.findByIdAndDelete(id)
        .then(() => {
          res.status(200).json({ message: 'Product has been deleted' });
        })
        .catch((err) => {
          res.status(404).json({ message: err });
        });
    }
  });
};

exports.postLoadProductsOfUser = (req, res) => {
  const comp = req.body.company;
  jwt.verify(req.token, process.env.JWT_SECRET, (err, authorizedData) => {
    if (err) {
      console.log('ERROR: Could not connect to the protected route');
      res.sendStatus(403);
    } else {
      ProductModal.find({ company: comp })
        .then((resData) => {
          res
            .status(200)
            .json({ message: 'Your Products has been loaded', data: resData });
        })
        .catch((err) => {
          res.status(404).json({ message: err });
        });
    }
  });
};
