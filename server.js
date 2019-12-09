// Get the mysql service
var mysql = require('mysql');

// Add the credentials to access your database
var connection = mysql.createConnection({
    host: 'mysql-gamification.inmbzp8022.in.dst.ibm.com',
    port: '3306',
    user: 'xxuser',
    password: 'welcome1',
    database: 'sampledb'  
});

// connect to mysql
connection.connect(function(err) {
    // in case of error
    if(err){
        console.log(err.code);
        console.log(err.fatal);
    }
});

// Perform a query
$query = 'SELECT * FROM XXIBM_PRODUCT_CATALOGUE LIMIT 10';

connection.query($query, function(err, rows, fields) {
    if(err){
        console.log("An error ocurred performing the query.");
        return;
    }

    console.log("Query succesfully executed: ", rows);
});

// Close the connection
connection.end(function(){
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

