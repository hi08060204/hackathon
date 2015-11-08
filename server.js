var express = require('express');
var router = require('./router');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.setHeader('Cache-Control', 'public, max-age=31557600');
    console.log(req.method, req.url);
    next();
});

app.use('/', router);

// catch 404 and forward to error handler 
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({ 
        message: err.message,
        error: err
    });
}); 

app.listen(port);
console.log('listening at port ' + port);
