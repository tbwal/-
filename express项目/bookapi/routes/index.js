var express = require('express');
var router = express.Router();
// var dbConfig = require('../util/dbconfig');
var saler = require('../controllers/saler')
    /* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', { title: 'Express' })
});

module.exports = router;