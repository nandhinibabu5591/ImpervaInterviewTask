const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const sqlite = require('sqlite');
const auth = require('./auth');
const db = require("./sqlite_sandbox.js")
const port = process.env.PORT || 5000;

app.listen(port, () => console.log('server is up and running'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
db.dbConnection;

app.get('/api', (req, res) => {
  res.json({
    express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT. Looking forward to what you will make of this. Develop away!'
  });
});

function runAsyncWrapper(callback) {
  return function (req, res, next) {
    callback(req, res, next)
      .catch(next)
  }
}

/* POST request to authenticate and send authentication cookie
    req - username, password
    res - authentication token
*/
app.post('/api/login', (req, res) => {
  //calls auth.js to perform authentication
  const authToken = auth.authUser(req.body);
  if (authToken) {
    res.cookie('AuthToken', authToken);
    res.status(200).end();
  } else {
    res.status(400).send('Incorrect username/password');
  }
});

app.get('/api/logout', (req, res) => {
  //calls auth.js to perform authentication
  const authToken = req.cookies['AuthToken'];
  if (authToken) {
    res.cookie('AuthToken', '', { expires: new Date(0) });
    res.status(200).send('Log out is successful');
  }
});



// GET request to send all customer details
app.get('/api/customers', runAsyncWrapper(async (req, res) => {
  const authToken = req.cookies['AuthToken'];
  if (authToken) {
    const rows = await db.customerDetails();
    res.status(200).json(rows);
  } else {
    res.status(401).end();
  }
}))


/* GET request to send all order details of a customer
    req - customerId
    res - order details
*/
app.get("/api/orders/:id", runAsyncWrapper(async (req, res) => {
  const authToken = req.cookies['AuthToken'];
  if (authToken) {
    const customerId = req.params.id;
    const rows = await db.orderDetails(customerId);
    res.status(200).json(rows);
  } else {
    res.status(401).end();
  }
}));

/* GET request to send payment details of a customer
    req - customerId
    res - payment details
*/
app.get("/api/payment/:id", runAsyncWrapper(async (req, res) => {
  const authToken = req.cookies['AuthToken'];
  const customerId = req.params.id;
  if (authToken) {
    const rows = await db.paymentInfo(customerId);
    res.status(200).json(rows);
  } else {
    res.status(401).end();
  }
}));

/* GET request to send all product details of a order
    req - orderId
    res - product details
*/
app.get("/api/products/:id", runAsyncWrapper(async (req, res) => {
  const authToken = req.cookies['AuthToken'];
  const productCode = req.params.id;
  if (authToken) {
    const rows = await db.productDetails(productCode);
    console.log(rows)
    res.status(200).json(rows);
  } else {
    res.status(401).end();
  }
}));