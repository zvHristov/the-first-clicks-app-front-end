var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');

/* GET users listing. */
router.get('/', async(req, res, next) => {


  res.json({user: {
    data: {
      userName: '',
      email: '',
    }
    }});
});

module.exports = router;
