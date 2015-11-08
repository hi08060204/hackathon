var express = require('express');
var filterByBudget = require('./filterLocationByBudget');
var findByLocation = require('./findEventByLocations');
var router = express.Router();

router.get(
    '/findEvents/:loc',
    findByLocation.requestData
);


router.get(
    '/validCities/:budget', 
    filterByBudget.requestData,
    filterByBudget.JsonParsing,
    filterByBudget.returnDest
);

router.get(
    '/search',
    findByLocation.departFlightSearch,
    findByLocation.arriveFlightSearch,
    findByLocation.sendData
);

module.exports = router;
