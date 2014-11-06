var express = require('express');
var app = express();

app.set('views', 'app/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/app/assets'));

app.get('/', function(req, res) {
  res.render('index.html');
});

var server = app.listen(process.env.PORT || 8000, function() {
  console.log('listening');
});
