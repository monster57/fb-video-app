var Home = {};

Home.getDashboard = function(req, res, next) {
  res.render('index', { title: 'Express' });
}

exports.Home = Home;