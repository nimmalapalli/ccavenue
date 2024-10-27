// const crypto = require('crypto');
// const querystring = require('querystring');

// const accessCode = 'ATQT06LJ00BT20TQTB';  // Replace with your CCAvenue Access Code
// const workingKey = '8D43381E1B825A74CA584729ED0A9E34';  // Replace with your CCAvenue Working Key
// const ccavenueUrl = 'https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction';

// function encrypt(data, key) {
//   // Convert key to 16-byte buffer (AES-128 requires a 16-byte key)
//   const keyBuffer = Buffer.from(key, 'hex');
  
//   // Generate a random 16-byte IV
//   const iv = crypto.randomBytes(16);

//   // Initialize cipher with key and IV
//   const cipher = crypto.createCipheriv('aes-128-cbc', keyBuffer, iv);

//   // Encrypt the data
//   let encrypted = cipher.update(data, 'utf8', 'hex');
//   encrypted += cipher.final('hex');

//   // Prepend IV to encrypted data (IV is needed for decryption)
//   return iv.toString('hex') + encrypted;
// }

// function createPaymentRequest(orderDetails) {
//   // Convert order details to query string format
//   const orderData = querystring.stringify(orderDetails);

//   // Encrypt the order data
//   const encryptedData = encrypt(orderData, workingKey);

//   // Generate the full URL with access code and encrypted data
//   const paymentUrl = `${ccavenueUrl}&encRequest=${encryptedData}&access_code=${accessCode}`;
  
//   return paymentUrl;
// }

// module.exports = {
//   createPaymentRequest,
// };
