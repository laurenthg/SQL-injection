var express = require('express');
var path = require('path');
var db = require('./db/login.js');
var app = express(); 
var session = require('express-session');

var app = express();

app.get ( '/' , function ( req , res ) {
	    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/log',function(req,res){
    var username = req.username; 
    var password = req.password;
    console.log("username: " + username);
    console.log("password: " + password);
    var query = "SELECT secret FROM user where username = '" + username + "' and password = '" + password + "'";

    console.log('query: ' + query);

    getLogin ( query, 
    function ( error , data ){
      if ( error == null )
        res.send ('Your secret:'+  data.secret+ '<p><a href="path.join(__dirname+\'index.html\')">Go back to login</a></p>)');
	  else if(!data)
	    res.sendFile(path.join(__dirname + '/indexFalse.html'));
      else
        res.render ( 'error' , { message : error }) ;
    })

  });

console.log("start 8080");
app.listen(8080);

