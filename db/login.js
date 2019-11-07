var pgp = require('pg-promise')(/*options*/)
var dbconfig = require('../config/settings.js').settings


var db = pgp(dbconfig)

getLogin = function getLogin(SQLQuery,callback ) {
    db.any ( SQLQuery, null )
      .then ( function( data ) {
          callback (null,data ) ;
      })
    .catch ( function(error ) {
      callback (error,null ) ;
    })
};


module.exports = {
  getLogin : getLogin
};

