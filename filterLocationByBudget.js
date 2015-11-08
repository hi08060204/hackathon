var unirest = require('unirest');
var HashMap = require('hashmap');


var cityURL = 'http://api.skyscanner.net/apiservices/browsequotes/v1.0/US/USD/en-US/SFO-iata/anywhere/anytime/anytime?apikey=ah507406726297845554149866835827';
var locURL = 'https://airport.api.aero/airport/';
var locUserKey = '?user_key=9c031295b29110e88d0991ec1050be28';


exports.returnDest = function(req, res, next) {
    var dest = req.dest;
    var placeMap = req.placeMap;
    var locations = []; 
    for (var i=0;i<dest.length;i++) {
        locations.push(placeMap.get(dest[i]));
    }
    res.json(locations);
}

exports.JsonParsing = function(req, res, next) {
    var itineraries = req.jsonFile['Quotes'];
    var budget = parseInt(req.params.budget);
    var dest = [];
    for (var i=0;i<itineraries.length;i++) {
        if (parseInt(itineraries[i]['MinPrice']) <= budget) {
            var dest_id = itineraries[i]['OutboundLeg']['DestinationId'];
            dest.push(dest_id);
        } 
    }
    req.dest = dest;
    next();
}

exports.requestData = function(req, res, next) {
    unirest.get(cityURL)
    .header('Accept', 'application/json')
    .end(function(response) {
        req.jsonFile = response.body;
        var map = new HashMap();
        for (var i=0;i<req.jsonFile['Places'].length;i++) { 
            map.set(req.jsonFile['Places'][i]['PlaceId'], req.jsonFile['Places'][i]);           
        }
        req.placeMap = map;
        next();
    });
}


