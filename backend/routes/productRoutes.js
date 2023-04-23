const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const productController = require("../controller/productController");
const uploads = require("../middlewares/uploads");

// GET Routes
router.get("/products", productController.getProducts);

router.get("/products/:id", productController.getProduct);
router.get("/products/seller/:seller", productController.getSellerProducts);
router.delete("/products/seller/delete", productController.deleteProduct);
// POST Routes
router.post(
  "/product",
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

router.post("/remove-item", productController.postRemoveProduct);
router.post("/load-items-user", productController.postLoadProductsOfUser);
module.exports = router;