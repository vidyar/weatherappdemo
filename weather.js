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
           var returnData;
	   try {
             returnData = JSON.parse(data);
           } catch(jsonParseError) {
              return done('Error parsing json',null);
           }
           return done(null,returnData);
          }
     });
  }
};

module.exports = weather;
