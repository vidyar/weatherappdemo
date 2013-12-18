var request = require('request');

var weather = {

  httpGet : function(zipcode,done) {
     var getUrl = 'http://www.myweather2.com/developer/forecast.ashx?uac=TOM4fBu8mN&query='+zipcode+'&output=json';
     console.log(getUrl);
     request({
       method: 'GET',
       url: getUrl
       }, function(err, res, data){
         if (err) {
	   console.log(err);
           done(err,null);
          } else {
           data = JSON.parse(data);
           return done(null,data);
          }
     });
  }
};

module.exports = weather;
