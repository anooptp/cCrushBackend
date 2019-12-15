const express = require('express');
const mysql = require('mysql');

const app = express();
var http = require('http').Server(app);
var bodyParser = require("body-parser");

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = mysql.createPool({
    connectionLimit : 10,
    host: process.env.OPENSHIFT_MYSQL_DB_HOST,
    port: process.env.OPENSHIFT_MYSQL_DB_PORT,
    user: process.env.OPENSHIFT_MYSQL_USER,
    password: process.env.OPENSHIFT_MYSQL_PASSWORD,
    database : process.env.OPENSHIFT_MYSQL_DATABASE
   });

// connect to mysql
db.getConnection(function(err, connection) {    
    // in case of error
    if(err){
        connection.release();
        console.log("Connection Failed");
        console.log( "Host:" + process.env.OPENSHIFT_MYSQL_DB_HOST );
        console.log(err.code);
        console.log(err);
        throw err;
    }
    console.log("Connected to db");
    connection.release();
});

/*
SELECT * 
  FROM XXIBM_PRODUCT_SKU psk,
       XXIBM_PRODUCT_STYLE pst,
       XXIBM_PRODUCT_PRICING ppr,
       XXIBM_PRODUCT_CATALOGUE pct
 WHERE pst.ITEM_NUMBER = psk.STYLE_ITEM
   AND pst.CATALOGUE_CATEGORY = pct.COMMODITY
   AND psk.ITEM_NUMBER = ppr.ITEM_NUMBER
   AND psk.CATALOGUE_CATEGORY = pst.CATALOGUE_CATEGORY
*/
// Perform a query
$query = 'SELECT * FROM XXIBM_PRODUCT_CATALOGUE LIMIT 10';
$query_catalogue = 'SELECT * FROM XXIBM_PRODUCT_CATALOGUE';
$query_pricing = 'SELECT * FROM XXIBM_PRODUCT_PRICING';
$query_sku = 'SELECT * FROM XXIBM_PRODUCT_SKU';
$query_style = 'SELECT * FROM XXIBM_PRODUCT_STYLE';
$query_all_join = `SELECT * 
FROM XXIBM_PRODUCT_SKU psk,
     XXIBM_PRODUCT_STYLE pst,
     XXIBM_PRODUCT_PRICING ppr,
     XXIBM_PRODUCT_CATALOGUE pct
WHERE pst.ITEM_NUMBER = psk.STYLE_ITEM
 AND pst.CATALOGUE_CATEGORY = pct.COMMODITY
 AND psk.ITEM_NUMBER = ppr.ITEM_NUMBER
 AND psk.CATALOGUE_CATEGORY = pst.CATALOGUE_CATEGORY`;

app.get('/', function(req, res) {
    console.log('API CALL: /');
    db.getConnection(function(err, connection) {
      if (err) {
        connection.release();
          console.log(' Error getting db connection: ' + err);
          throw err;
      }
      connection.query($query, function(err2, rows, fields) {
        if (err2) {
          res.json(err2); 
        } else {
          res.json(rows); 
        }
      });
      connection.release();
    });
});

app.get('/api/catalogue', function(req, res) {
  console.log('API CALL: /api/catalogue');
  db.getConnection(function(err, connection) {
    if (err) {
      connection.release();
        console.log(' Error getting db connection: ' + err);
        throw err;
    }
    connection.query($query_catalogue, function(err2, rows, fields) {
      if (err2) {
        res.json(err2); 
      } else {
        res.json(rows); 
      }
    });
    connection.release();
  });
});

app.get('/api/pricing', function(req, res) {
  console.log('API CALL: /api/pricing');
  db.getConnection(function(err, connection) {
    if (err) {
      connection.release();
        console.log(' Error getting db connection: ' + err);
        throw err;
    }
    connection.query($query_pricing, function(err2, rows, fields) {
      if (err2) {
        res.json(err2); 
      } else {
        res.json(rows); 
      }
    });
    connection.release();
  });
});

app.get('/api/sku', function(req, res) {
  console.log('API CALL: /api/sku');
  db.getConnection(function(err, connection) {
    if (err) {
      connection.release();
        console.log(' Error getting db connection: ' + err);
        throw err;
    }
    connection.query($query_sku, function(err2, rows, fields) {
      if (err2) {
        res.json(err2); 
      } else {
        res.json(rows); 
      }
    });
    connection.release();
  });
});

app.get('/api/style', function(req, res) {
  console.log('API CALL: /api/sku');
  db.getConnection(function(err, connection) {
    if (err) {
      connection.release();
        console.log(' Error getting db connection: ' + err);
        throw err;
    }
    connection.query($query_style, function(err2, rows, fields) {
      if (err2) {
        res.json(err2); 
      } else {
        res.json(rows); 
      }
    });
    connection.release();
  });
});

app.get('/api/all', function(req, res) {
  console.log('API CALL: /api/all');
  db.getConnection(function(err, connection) {
    if (err) {
      connection.release();
        console.log(' Error getting db connection: ' + err);
        throw err;
    }
    connection.query($query_all_join, function(err2, rows, fields) {
      if (err2) {
        res.json(err2); 
      } else {
        res.json(rows); 
      }
    });
    connection.release();
  });
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT");
  next();
});

app.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", port " + server_port );
});
