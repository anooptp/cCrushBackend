var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

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
        console.log("Connection Failed")
        console.log(err.code);
        console.log(err);
        return;
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

server.listen(server_port, server_ip_address, function () {
    console.log( "Listening on " + server_ip_address + ", port " + server_port )
});
  