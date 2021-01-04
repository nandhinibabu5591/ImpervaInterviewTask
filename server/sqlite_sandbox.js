const Promise = require('bluebird');
const sqlite3 = require('sqlite3').verbose();
const DBSOURCE = `${__dirname}/data/database.sqlite`;

let db_connection = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message)
        throw err
    } else {
        console.log('Connected to the SQlite database.')
    }
});

function getCustomersDetails() {
    return new Promise(async function (resolve, reject) {
        let sql = 'SELECT * FROM customers';
        db_connection.all(sql, [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function getOrderdetails(custId) {
    return new Promise(async function (resolve, reject) {
        let sql = `SELECT o.orderNumber, o.orderDate, o.requiredDate, o.shippedDate, o.status, o.comments, o.customerNumber, od.productCode, od.quantityOrdered, od.priceEach, od.orderLineNumber, p.productName, p.productLine FROM orders o INNER JOIN orderdetails od ON o.orderNumber = od.orderNumber INNER JOIN products p ON od.productCode = p.productCode WHERE customerNumber = ?`;
        db_connection.all(sql, custId, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function getPaymentInfo(custId) {
    return new Promise(async function (resolve, reject) {
        let sql = `SELECT customerNumber, checkNumber, paymentDate, amount FROM payments WHERE customerNumber = ?`;
        db_connection.all(sql, custId, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function getProductdetails(productCode) {
    return new Promise(async function (resolve, reject) {
        let sql = `SELECT productCode, productName, productLine, productScale, productVendor, productDescription, quantityInStock, buyPrice, MSRP FROM products WHERE productCode = ?`
        db_connection.all(sql, productCode, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function close() {
    db_connection.close();
}

module.exports.dbConnection = db_connection;
module.exports.dbClose = close;
module.exports.customerDetails = getCustomersDetails;
module.exports.orderDetails = getOrderdetails;
module.exports.paymentInfo = getPaymentInfo;
module.exports.productDetails = getProductdetails;