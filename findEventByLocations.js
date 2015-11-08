var unirest = require('unirest');
var HashMap = require('hashmap');
var Q = require('q');
var eventURL = 'http://api.eventful.com/json/events/search?...&date=future&app_key=8JdkqRPV9zx485XW';
var cityURL = 'http://api.skyscanner.net/apiservices/browsequotes/v1.0/US/USD/en-US/';
var apiKey = 'apikey=ah507406726297845554149866835827';
var departDone, arriveDone;

exports.requestData = function(req, res, next) {
    var URL = eventURL + '&location=' + req.params.loc.replace(" ", "+");
    unirest.get(URL)
    .end(function(response) {
        var JsonFile = JSON.parse(response.body);
        res.send(JsonFile);
    })
}

exports.sendData = function(req, res, next) {
    flights = {};
    flights['depart'] = req.depart;
    flights['arrive'] = req.arrive;
    flights['places'] = req.places;
    flights['carriers'] = req.carriers;
    res.send(flights);
}

exports.arriveFlightSearch = function(req, res, next) {
    var origin = req.query.origin + '-sky';
    var destination = req.query.destination + '-sky';
    var departDate = new Date(req.query.departDate);
    var arriveDate = new Date(req.query.arriveDate);
    var diff = parseInt((arriveDate.getTime() - departDate.getTime())/(24*3600*1000));
    departDate.setDate(departDate.getDate() - 1);
    arriveDate.setDate(departDate.getDate() + 1);
    arrive = [];
    var remain = diff;
    for (var i=0;i<diff;i++) { 
        var dateString = arriveDate.toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ');
        var URL = cityURL + destination + '/' +
            origin + '/' + 
            dateString[0] + 
            '?' + apiKey;
        unirest.get(URL)
        .header('Accept', 'application/json')
        .end(function(response) { 
            for (var j=0;j<response.body['Quotes'].length;j++) {
                arrive.push(response.body['Quotes'][j]);
            }
            remain -= 1;
            if (remain == 0) {
                req.arrive = arrive;
                next();
            }
          
        });
        arriveDate.setDate(arriveDate.getDate() + 1);
    }
}

exports.departFlightSearch = function(req, res, next) {
    var origin = req.query.origin + '-sky';
    var destination = req.query.destination + '-sky';
    var departDate = new Date(req.query.departDate);
    var arriveDate = new Date(req.query.arriveDate);
    var diff = parseInt((arriveDate.getTime() - departDate.getTime())/(24*3600*1000));
    departDate.setDate(departDate.getDate() - 1);
    arriveDate.setDate(departDate.getDate() + 1);
    depart = [];
    places = {};
    carriers = {};
    var remain = diff;
    for (var i=0;i<diff;i++) { 
        var dateString = departDate.toISOString().replace(/T/, ' ').replace(/\..+/, '').split(' ');
        var URL = cityURL + origin + '/' + 
            destination + '/' + 
            dateString[0] + 
            '?' + apiKey;

        unirest.get(URL)
        .header('Accept', 'application/json')
        .end(function(response) {
            for (var j=0;j<response.body['Quotes'].length;j++) {
                depart.push(response.body['Quotes'][j]);
            }
            for (var j=0;j<response.body['Places'].length;j++) {
                places[response.body['Places'][j]['PlaceId']] = response.body['Places'][j];
            }
            for (var j=0;j<response.body['Carriers'].length;j++) {
                carriers[response.body['Carriers'][j]['CarrierId']] = response.body['Carriers'][j];
            }
            remain -= 1;
            if (remain == 0) {
                req.depart = depart;
                req.places = places;
                req.carriers = carriers;
                next();
            }
        });
        departDate.setDate(departDate.getDate() + 1);
    }
}

