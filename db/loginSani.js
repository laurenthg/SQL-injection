var pgp = require('pg-promise')(/*options*/)
var dbconfig = require('../config/settings.js').settings


var db = pgp(dbconfig)

 getLogin = function getLogin(username, password,callback ) {
     var query = "SELECT secret FROM LOGIN where username ='" + username + "' and password ='" + password+"'";
     db.any ( query, null )
       .then ( function( data ) {
		   callback (null,data ) ;
       })
     .catch ( function(error ) {
       callback (error,null ) ;
     })
 };


insertLogin = function insertLogin(SQLQuery,callback){
	db.any(SQLQuery,null)
		.then (function(data){
			callback(null,data);
		})
		.catch ( function(error){
			callback(error,null);
		})
};

module.exports = {
  getLogin : getLogin,
  insertLogin : insertLogin
};
