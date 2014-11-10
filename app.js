var express = require('express');
var app = express();
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.render('dashboard.html');
});

app.get('/calendar', function(req, res) {
  res.render('index.html');
});

var server = app.listen(process.env.PORT || 8000, function() {
  console.log('listening');
});
