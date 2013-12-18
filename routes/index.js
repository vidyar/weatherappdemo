
/*
 * GET home page.
 */

exports.index = function(req, res,data){
  res.render('index', { title: 'Express' });
};
exports.result = function(req,res,zipcode,data) {
  res.render('results', { zipCode : zipCode, data: data });
};
