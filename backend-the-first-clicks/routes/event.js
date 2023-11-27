var express = require('express');

var router = express.Router();

// const puppeteer = require('puppeteer');

/* GET dashboard listing. */
router.get('/', async(req, res, next) => {
    // const browser = await puppeteer.launch();
    console.log(req, 'req');
    res.status(200).json({
     msg: 'event was gets!'
    });

});

router.post('/', async(req, res, next) => {
    // const browser = await puppeteer.launch();
    console.log('event post',req.body);

    res.status(200).json({'project':'event post is added successfully'})
});

module.exports = router;
