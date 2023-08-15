const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const productController = require("../controller/productController");
const uploads = require("../middlewares/uploads");

const checkToken = (req, res, next) => {
  const header = req.headers['authorization'];

  if(typeof header !== 'undefined') {

      const bearer = header.split(' ');
      const token = bearer[1];

      req.token = token;

      next();
  } else {
    
      res.sendStatus(403)
  }
}
// GET Routes

router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProduct);
router.get("/products/seller/:seller",checkToken, productController.getSellerProducts);
router.delete("/products/seller/delete",checkToken, productController.deleteProduct);
// POST Routes
router.post(
  "/product",checkToken,
  [
    check("name").notEmpty(),
    check("price").isNumeric(),
    check("description").notEmpty(),
    check("image").notEmpty(),
    check("category").notEmpty(),
    check("company").notEmpty(),
    check("stock").isNumeric(),
  ],
  uploads.imageUpload.single("image"),
  productController.postProduct
);

router.post("/remove-item",checkToken, productController.postRemoveProduct);
router.post("/load-items-user", productController.postLoadProductsOfUser);
module.exports = router;
