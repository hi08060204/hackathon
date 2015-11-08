var express = require('express');
var filterByBudget = require('./filterLocationByBudget');
var router = express.Router();

router.get(
    '/validCities/:budget', 
    filterByBudget.requestData,
    filterByBudget.JsonParsing,
    filterByBudget.returnDest);

module.exports = router;
