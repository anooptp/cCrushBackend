const express = require('express');
const mysql = require('mysql');

const app = express();

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// Add the credentials to access your database
/*var connection = mysql.createConnection({
    host: 'mysql-gamification.inmbzp8022.in.dst.ibm.com',
    port: '3306',
    user: 'xxuser',
    password: 'welcome1',
    database: 'sampledb'  
});
var connection = mysql.createConnection({
host     : 'mysql.database-check.svc.cluster.local',
port     : '3306',
user     : 'ccuser',
password : 'welcome1',
database : 'productdb'
});*/

const db = mysql.createConnection({
    host: process.env.OPENSHIFT_MYSQL_DB_HOST,
    port: process.env.OPENSHIFT_MYSQL_DB_PORT,
    user: process.env.OPENSHIFT_MYSQL_USER,
    password: process.env.OPENSHIFT_MYSQL_PASSWORD,
    database : process.env.OPENSHIFT_MYSQL_DATABASE
   });

// connect to mysql
db.connect(function(err) {
    // in case of error
    if(err){
        console.log("Connection Failed");
        console.log( "Host:" + process.env.OPENSHIFT_MYSQL_DB_HOST );
        console.log(err.code);
        console.log(err);
        return;
    }
    console.log("Connected to db");
});

// Perform a query
$query = 'SELECT * FROM XXIBM_PRODUCT_CATALOGUE LIMIT 10';

db.query($query, function(err, rows, fields) {
    if(err){
        console.log("An error ocurred performing the query.");
        return;
    }
    console.log("Query succesfully executed: ", rows);
});

app.get('/', function(req, res) {
    db.query($query, function(err, rows, fields) {
      if (err) {
        res.send('NOT OK' + JSON.stringify(err));
      } else {
        res.send('OK: ' + rows);
      }
    });
  });
  
// Close the connection
/*db.end(function(){
    // The connection has been closed
});*/

app.listen(server_port, server_ip_address, function () {
    console.log( "Listening on " + server_ip_address + ", port " + server_port );
});
