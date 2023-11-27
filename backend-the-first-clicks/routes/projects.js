var express = require('express');

var router = express.Router();

// const puppeteer = require('puppeteer');
var fakeData = require('../public/fakeProjects.json');
/* GET dashboard listing. */
router.get('/', async(req, res, next) => {
    // const browser = await puppeteer.launch();
    console.log('event get projects', res);
    res.status(200).json(fakeData);

});

router.post('/', async(req, res, next) => {
    // const browser = await puppeteer.launch();
    console.log('event post',req.body);

    res.status(200).json({'adUnit':'AdUnit is added successfully'})
});

module.exports = router;
