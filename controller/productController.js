const ProductModal = require("../models/productModal");
const redis = require("redis");

require('./client')
const { clearHash } = require('./client')
// GET Methods
exports.getProducts = async (req, res) => {
  try {
      const data = await ProductModal.find();
      res.status(200).json((data));    
    }
    catch (err) {
    console.log(err);
    res.status(404).json({ message: err });
  }
};


exports.getSellerProducts = (req, res) => {
  const seller = req.params.seller;
  console.log(seller);
  ProductModal.find({ seller: seller })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
};

exports.deleteProduct = (req, res) => {
  console.log(req.body.id);
  clearHash('default')
  ProductModal.deleteOne({ _id: req.body.id })
    .then((product) => {
      if (!product) {
        return res.status(403).json({ message: "Product does not exist" });
      }
      return res
        .status(201)
        .json({ message: "Product has been deleted!!!", result: product });
    })
    .catch((err) => {
      return res.status(500).json({ error: err });
    });
};
exports.getProduct = (req, res) => {
  const id = req.params.id;
  // console.log(id, "hi");
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
  console.log(req.file);
  clearHash('default')
  const product = new ProductModal({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.file?.path
    .toString()
    .replace(/\\/g, "/")
    .split("shared/")
    .slice(1)
    .join(""),
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
        .json({ message: "Product has been added", result: result })
    )
    .catch((err) => {
      res.status(403).json({ message: "Something went wrong" });
    });
};

exports.postRemoveProduct = (req, res) => {
  clearHash('default')
  const id = req.body.id;
  ProductModal.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: "Product has been deleted" });
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
};

exports.postLoadProductsOfUser = (req, res) => {
  const comp = req.body.company;
  ProductModal.find({ company: comp })
    .then((resData) => {
      res
        .status(200)
        .json({ message: "Your Products has been loaded", data: resData });
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
};