var express = require('express');
var path = require('path');
var db = require('./db/login.js');
var app = express(); // creation du serveur
var session = require('express-session');

var app = express();

app.get('/log',function(req,res){
    var username = req.body.username; 
    var password = req.body.password;
    var query = "SELECT secret FROM user where username = '" + username + "' and password = '" + password + "'";

    console.log("username: " + username);
    console.log("password: " + password);
    console.log('query: ' + query);

    getLogin ( query, 
    function ( error , data ){
      if ( error == null )
        res.render ( 'secret' , { secret: data});
      else
        res.render ( 'error' , { message : error }) ;
    })

  });
console.log(secret);


app.listen(8080);

