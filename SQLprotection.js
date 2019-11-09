var express = require('express');
var path = require('path');
var db = require('./db/loginprotection.js');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
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
    getLogin ( username, password,
    function ( error , data ){
      if ( error == null ){
		console.log(data[0]);
		if (data[0]==undefined){
		    console.log("fail to login");
			res.sendFile(path.join(__dirname + '/indexFalse.html'));
		}	
		else{
		    console.log("success to login");
			res.send ('Your secret:'+  data[0].secret+ '<p><a href=http://localhost:8080>Go back to login</a></p>)');
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
	var secret = req.body.secret;
    console.log("secret: " + secret);

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
