const router = require("express").Router();
const ordersController = require("../controller/ordersController");
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
router.get("/orders", ordersController.getOrders);
router.get('/orders/:buyerEmail',ordersController.getOrdersBuyer);
router.get('/orders/sell/:sellerEmail',checkToken,ordersController.getOrdersSeller)
// POST Routes
router.post("/orders",ordersController.postOrders);
router.put('/orders/:orderId/items/:itemId/status',ordersController.updateOrderStatus)
module.exports = router;
