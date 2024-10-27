
const express = require('express');
const crypto =require('crypto')
const router = express.Router();
const Razorpay = require('razorpay');
const Payment = require('../models/paymentModel'); // Adjust the path as per your project structure
const cors = require('cors')
// const razorpayInstance = new Razorpay({
//   key_id: 'rzp_test_7xBELXxLBhucXw', // Replace with your key_id
//   key_secret: 'F9tAWxv6CV5vuMoCnaMUvoF3' // Replace with your key_secret
// });
const razorpay = new Razorpay({
  key_id: 'rzp_test_7xBELXxLBhucXw', // Replace with your API Key
  key_secret: 'F9tAWxv6CV5vuMoCnaMUvoF3' // Replace with your Secret Key
});

router.post('/create-order', async (req, res) => {
  const options = {
      amount: req.body.amount * 100, // Amount in paise
      currency: 'INR',
      receipt: 'receipt#1',
  };
  try {
      const order = await razorpay.orders.create(options);
      res.json(order);
  } catch (error) {
      res.status(500).json({ error });
  }
});
router.post('/order',cors(), (req, res) => {
  const { amount, currency, receipt} = req.body;

  razorpayInstance.orders.create({ amount, currency, receipt }, (err, order) => {
    if (!err) {
      // Create a new payment document
      const payment = new Payment({
      
        id: order.id,
        entity: order.entity,
        amount: order.amount,
        currency: order.currency,
        receipt: order.receipt,
        status: order.status,
        created_at: order.created_at,
        // Add other fields as per your requirements
      });

      // Save the payment document to MongoDB
      payment.save()
          res.json(savedPayment);
     
    }})
});



router.post('/verifyOrder',  (req, res)=>{ 
    
  // STEP 7: Receive Payment Data
  const {order_id, payment_id} = req.body;     
  const razorpay_signature =  req.headers['x-razorpay-signature'];

  // Pass yours key_secret here
  const key_secret = F9tAWxv6CV5vuMoCnaMUvoF3;     

  // STEP 8: Verification & Send Response to User
  
  // Creating hmac object 
  let hmac = crypto.createHmac('sha256', key_secret); 

  // Passing the data to be hashed
  hmac.update(order_id + "|" + payment_id);
  
  // Creating the hmac in the required format
  const generated_signature = hmac.digest('hex');
  
  
  if(razorpay_signature===generated_signature){
      res.json({success:true, message:"Payment has been verified"})
  }
  else
  res.json({success:false, message:"Payment verification failed"})
});
module.exports = router;