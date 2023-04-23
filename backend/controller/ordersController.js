const OrdersModal = require("../models/ordersModal");
const ProductModal = require("../models/productModal");
// GET Methods
exports.getOrders = (req, res) => {
  OrdersModal.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
};





exports.getOrdersBuyer = async (req, res) => {
  try {
    const orders = await OrdersModal.find({ buyerEmail: req.params.buyerEmail }); 

    const productIds = orders.map(order => order.cartItems.map(product => product.id)).flat(); 

    const products = await Promise.all(productIds.map(productId => {
      return ProductModal.findOne({ _id: productId }); 
    }));


    const filteredProducts = products.filter(product => product);

    const productsWithAdditionalFields = filteredProducts.map(product => {
      const order = orders.find(order => order.cartItems.some(item => item.id === product._id.toString()));
      return {
        ...product.toObject(), 
        status: order.cartItems.find(item => item.id === product._id.toString()).status,
        buyerEmail: order.buyerEmail,
        amount: order.cartItems.find(item => item.id === product._id.toString()).amount,
        
      };
    });

    res.json(productsWithAdditionalFields); 
  } catch (err) {
    res.json({ message: err });
  }
};




exports.getOrdersSeller = async (req, res) => {
  try {
    const sellerEmail = req.params.sellerEmail;

    const orders = await OrdersModal.find({"cartItems.seller": sellerEmail}); 

    const cartItems = orders.flatMap(order => {
      
      return order.cartItems.filter(item => {
        
        return item.seller === sellerEmail;
      }).map(item => {
        
        return {
          ...item,
          oid: order._id,
          buyerEmail:order.buyerEmail
        };
      });
    });
    
    console.log(cartItems)
    res.json(cartItems); 
  } catch (err) {
    console.log(err)
    res.json({ message: err });
  }
};

// exports.getOrdersSeller = async (req, res) => {
//   try {
//     const sellerEmail = req.params.sellerEmail;
    
//     const orders = await OrdersModal.find({"cartItems.seller": sellerEmail}); 
//     const cartItems = orders.flatMap(order => { order.cartItems.filter(item => item.seller === sellerEmail)});
    
    
    
//     console.log(cartItems)
//     res.json(cartItems); 
//   } catch (err) {
//     res.json({ message: err });
//   }
// };






exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, itemId } = req.params; 
    const {status} = req.body; 
    
 
    const updatedOrder = await OrdersModal.updateOne(
      { _id: orderId, 'cartItems.id': itemId }, 
      { $set: { 'cartItems.$.status': status } },    { new: true } 
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found or item not updated' });
    }
   console.log(updatedOrder)
    res.json({ message: 'Item updated successfully', item: updatedOrder.cartItems.find(item => item.id.toString() === itemId) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update item' });
  }
};





// POST Methods
exports.postOrders = (req, res) => {
  arr=[]
  console.log(req.body)
  for(let i=1;i<req.body.length;i++){
    arr.push(req.body[i])
    }
  
  const orders = new OrdersModal({
    buyerEmail: req.body[0].buyerEmail,
    cartItems: arr,
  });
  const productIds = arr.map(item => item.id);
  ProductModal.find({ _id: { $in: productIds }})
    .then(products => {
      // Update the stock value for each product based on the quantity ordered
      arr.forEach(item => {
        const product = products.find(p => p._id.equals(item.id));
        if (product) {
          product.stock -= item.amount;
          product.save();
        }
      });})
  
  orders.save().then((result) =>
      res
        .status(200)
        .json({ message: "Orders has been placed", result: result })
    ).catch(err => {
      res.status(403).json({message: "Something went wrong"})
    });

};
