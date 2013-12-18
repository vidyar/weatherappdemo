
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var request = require('request');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

var getApiData = function() {
  var WeatherData = {
    Overall_Weather_Text : 'N/A',
    Temperature : 'N/A',
    Wind: 'N/A'
  };
  try {
    request({
      method: 'GET',
      url: 'http://www.myweather2.com/developer/forecast.ashx?uac=TOM4fBu8mN&query=00000&output=json',
    },function(err,res,data) {
       if(err) {
         return WeatherData; 
       }
       else {
         var currentWeather = weather.curren_weather;
         WeatherData.Overall_Weather_Text = currentWeather.weather_text;
         WeatherData.Temperature = currentWeather.temp;
         WeatherData.Wind = currentWeather.wind.speed;
         return WeatherData;
       }
    });
   }catch(err) {

   }
   return WeatherData;
}

app.get('/',function(req,res) {
   var WeatherData = getApiData();
   routes.index(req,res,WeatherData);
});
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
