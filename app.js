const express = require('express');


const app = express();


const cors = require('cors')

const mongoose = require('mongoose');
     
const bodyParser = require('body-parser');


const port = process.env.PORT || 63320;

const paymentRoute = require('./routes/ccavenuePayment');

const uri = 
// 'mongodb+srv://nikhilareddygandlapati:fO8kXWN8aMJKyIyf@cluster0.emcygxj.mongodb.net/?retryWrites=true&w=majority';
//  `mongodb+srv://snvitsolutions5:4CNhVx3Lp9rZ0NS8@cluster0.2smu8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&ssl=true`
// `mongodb+srv://snvitsolutions5:Tj0BzwIs3f7Lb6xO@cluster0.2smu8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0&ssl=true`

`mongodb://localhost:27017`

mongoose.connect(uri, {

  });
const db = mongoose.connection;
db.on('error', (error) => {
  console.error('Error connecting to MongoDB Atlas with Mongoose:', error);
});
db.once('open', () => {
  console.log('Connected to MongoDB Atlas with Mongoose');
});




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