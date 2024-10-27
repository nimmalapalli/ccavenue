const express = require('express');


const app = express();


const cors = require('cors')

const mongoose = require('mongoose');
     
const bodyParser = require('body-parser');


const port = process.env.PORT || 63320;

const paymentRoute = require('./routes/ccavenuePayment');





app.use(cors());
app.use(bodyParser.json());



app.use(express. urlencoded({extended:false}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 next();
});




app.use('/api/payment',paymentRoute);



 app.get('/',(req,res)=>{
  res.send('welcome')
 });


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});