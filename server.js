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
});

// Perform a query
$query = 'SELECT * FROM XXIBM_PRODUCT_CATALOGUE LIMIT 10';

/*db.query($query, function(err, rows, fields) {
    if(err){
        console.log("An error ocurred performing the query.");
        return;
    }
    console.log("Query succesfully executed: ", rows);
});
*/

app.get('/', function(req, res) {
    console.log('API CALL: /');
    db.getConnection(function(err, connection) {
      if (err) {
        connection.release();
          console.log(' Error getting db connection: ' + err);
          throw err;
      }
      connection.query($query, function(err, rows, fields) {
        if (err) {
          res.send('NOT OK' + JSON.stringify(err));
        } else {
          res.send('OK: ' + JSON.stringify(rows));
        }
      });
    });
});
  
  app.get('/api/database/status',function(req,res) {
    console.log('API CALL: /api/database/status');
    var retvalSettingValue = "?";
    db.getConnection(function(err, connection) {
      if (err) {
        connection.release();
          console.log(' Error getting db connection: ' + err);
          throw err;
        }
        connection.query('SELECT SettingValue FROM your_database_table WHERE SettingKey =\'DatabaseStatus\'', function(err2, rows, fields) {	
          if (err2) {
          var data = { "Time":"", "DatabaseStatus":"" };
          data["Time"] = (new Date()).getTime();
          data["DatabaseStatus"] = "Down";
          res.json(data); 
        } else {
          var dbretval = rows[0].SettingValue;
          if (dbretval == 1 ) {
            var data = { "Time":"", "DatabaseStatus":"" };
            data["Time"] = (new Date()).getTime();
            data["DatabaseStatus"] = "Up";
            res.json(data); 
          } else {
            var data = { "Time":"", "DatabaseStatus":"" };
            data["Time"] = (new Date()).getTime();
            data["DatabaseStatus"] = "Down";
            res.json(data); 
          }
        }
        console.log(' mysql_pool.release()');
        connection.release();
        });
    });
  });
  

app.listen(server_port, server_ip_address, function () {
    console.log( "Listening on " + server_ip_address + ", port " + server_port );
});
