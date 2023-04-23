const router = require("express").Router();
// const { check, validationResult } = require('express-validator');
// const uploads = require("../middlewares/uploads");
const ordersController = require("../controller/ordersController");

// GET Routes
router.get("/orders", ordersController.getOrders);
router.get('/orders/:buyerEmail',ordersController.getOrdersBuyer);
router.get('/orders/sell/:sellerEmail',ordersController.getOrdersSeller)
// POST Routes
router.post("/orders",ordersController.postOrders);
router.put('/orders/:orderId/items/:itemId/status',ordersController.updateOrderStatus)
module.exports = router;
