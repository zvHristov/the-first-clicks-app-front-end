var express = require('express');

var router = express.Router();


/* GET dashboard listing. */
router.get('/', async(req, res, next) => {
    // const browser = await puppeteer.launch();
    console.log(req, 'req');
    res.status(200).json({
        msg: 'send'
    });

});


module.exports = router;
