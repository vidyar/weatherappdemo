
/*
 * GET home page.
 */

exports.index = function(req, res,data){
  res.render('index', { title: 'Express' });
};
exports.results = function(req,res,zipCode,data) {
  res.render('results', { zipCode : zipCode, data: data });
};
