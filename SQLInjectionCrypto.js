var express = require('express');
var path = require('path');
var db = require('./db/login.js');
var app = express(); 
var session = require('express-session');
var bodyParser = require('body-parser');
var SimpleCrypto = require("simple-crypto-js").default;
var _secretKey = 'secretKey'; 
var simpleCrypto = new SimpleCrypto(_secretKey);
var sha256 = require('js-sha256');
var app = express();
app.use(bodyParser.urlencoded({ extended : true }));// use for get 'name' from HTML to app.post

app.get ( '/' , function ( req , res ) {
	    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get ( '/signUp' , function ( req , res ) {
	    res.sendFile(path.join(__dirname + '/signUp.html'));
});

app.post('/log',function(req,res){
    var username = req.body.username; 
    console.log("username: " + username);
    var password = req.body.password;
    console.log("password: " + password);
	var hashUsername = sha256.create();
	hashUsername.update(username);
    console.log("username hash: " + hashUsername);
	var hashPassword = sha256.update(password);
    console.log("password hash: " + hashPassword);

    var query = "SELECT secret FROM LOGINCRYPTO where username ='" + hashUsername + "' and password ='" + hashPassword+"'";

    console.log('query: ' + query);

    getLogin ( query, 
    function ( error , data ){
      if ( error == null ){
		if (data[0]==undefined)  
			res.sendFile(path.join(__dirname + '/indexFalse.html'));
		else{ 
			var decipherText = simpleCrypto.decrypt(data[0].secret);
			console.log("decipherText:"+  decipherText);
			res.send ('Your secret:'+  decipherText+ '<p><a href=http://localhost:8080>Go back to login</a></p>)');
		}	
	  }	  
      else
		res.json({error:error});
    })

  });

app.post('/signUp',function(req,res){
    var username = req.body.username; 
    console.log("username: " + username);
    var password = req.body.password;
    console.log("password: " + password);
	var hashUsername = sha256.create();
	hashUsername.update(username);
    console.log("username hash: " + hashUsername);
	var hashPassword = sha256.update(password);
    console.log("password hash: " + hashPassword);
	var secret = req.body.secret;
	var hashSecret = simpleCrypto.encrypt(secret);
	var query  = "INSERT INTO LOGINCRYPTO(username,password,secret) VALUES ('"+hashUsername +"','"+hashPassword+"','"+hashSecret+"')";
	
	console.log('query: ' + query);
    
    insertLogin(query,function(error,data){
		if(error !=null){
			res.json({error:error});
		}
		else {
			res.sendFile(path.join(__dirname + '/index.html'));
		}	
	})
});

console.log("start 8080");
app.listen(8080);

