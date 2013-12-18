
/*
 * GET home page.
 */

exports.index = function(req, res,data){
  res.render('index', { title: 'Weather Data Search' });
};
exports.results = function(req,res,zipCode,data) {
  res.render('results', { zipCode : zipCode, data: data });
};
