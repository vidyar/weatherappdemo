
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var request = require('request');
var weather = require('./weather');
var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var app = express();

//Initalize the strategy here..
passport.use(
  new GitHubStrategy({
    clientID: '5a4c38eeb2aa32a15062',
    clientSecret:'c3f2c2ea135662116476b739993b3eead2c32592',
    callbackURL:'http://localhost:3000/auth/github/callback'
    }, function(accessToken,refreshToken,profile,done) {
      //If you are here, then you have a accessToken
      done(null,profile);
    })
);
//The order matters! 
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(passport.initialize());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/',routes.index);
app.post('/results',function(req,res) {
   var zipCode = req.body.zipCode;
   weather.httpGet(zipCode,function(err,weatherData) {
     var filteredWeatherData = {
       overallWeatherText : 'N/A',
       temperature : 'N/A',
       windSpeed: 'N/A'
     };
     if(!err) {
       //Consult myweather2.com API for more information..
       var propertiesOfWeatherForecast = weatherData.weather.curren_weather[0];
       console.log('D: %j', propertiesOfWeatherForecast);
       filteredWeatherData.overallWeatherText =  propertiesOfWeatherForecast.weather_text;
       filteredWeatherData.temperature = propertiesOfWeatherForecast.temp;
       filteredWeatherData.windSpeed =  propertiesOfWeatherForecast.wind[0].speed;
     }
     routes.results(req,res,zipCode,filteredWeatherData);
   });
});
app.get('/users', user.list);
app.get('/home',routes.home);
//Github Auth
app.get('/auth/github',
  passport.authenticate('github'),
  function(req, res){
    //Wont be called because we are at github..  
});
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    console.log("%j",req);
    res.redirect('/home');
  });
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
