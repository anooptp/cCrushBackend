const express = require('express');

// Get the mysql service
const mysql = require('mysql');

const app = express();

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

// Add the credentials to access your database
/*var connection = mysql.createConnection({
    host: 'mysql-gamification.inmbzp8022.in.dst.ibm.com',
    port: '3306',
    user: 'xxuser',
    password: 'welcome1',
    database: 'sampledb'  
});
var connection = mysql.createConnection({
 host     : 'mysql.gamification.svc.cluster.local',
 port     : '3306',
 user     : 'xxuser',
 password : 'welcome1',
 database : 'sampledb'
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
        console.log("Connection Failed")
        console.log(err.code);
        console.log(err);
        return;
    }
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

// Close the connection
db.end(function(){
    // The connection has been closed
});

/*
DB details to connect from Openshift
database=sampledb
url=jdbc:mysql://mysql.gamification.svc.cluster.local:3306/mysql
DB Details to connect from remote
Host: mysql-gamification.inmbzp8022.in.dst.ibm.com
Port : 3306
*/

app.listen(server_port, server_ip_address, function () {
    console.log( "Listening on " + server_ip_address + ", port " + server_port )
});
