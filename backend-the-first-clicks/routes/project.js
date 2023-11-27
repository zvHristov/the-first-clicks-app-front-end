var express = require('express');

var router = express.Router();

// const puppeteer = require('puppeteer');
var fakeData = require('../public/fakeProjects.json');
/* GET dashboard listing. */
router.get('/', async(req, res, next) => {
    // const browser = await puppeteer.launch();
    console.log(req, 'req');
    res.status(200).json({
        "id": 1,
        "name": "Figma",
        "description": "Home - Figma: the collaborative interface design tool.",
        "pageId": 1,
        "thumbnail": null,
        "status": 1,
        "updated": "2021-02-04",
        "domain": "https://figma.com",
        "parentIds": 1,
        "trackedVisitors": 3455,
        "excludeElements": ["id_coocke", "notfication_id"],
        "createdAt": "2021-02-02",
        "team": [
                {
                    "firstName": "Tomas",
                    "lastName": "Heines",
                    "email": "t.heines@gmail.com",
                    "status": 1,
                    "userPermissions": "MANAGE",
                    "jobPossition": "SEO",
                    "timezone": "Brasil",
                    "thumbnail": ""

                },
                {
                    "firstName": "Mohamed",
                    "lastName": "Sahini",
                    "email": "m.sahini@gmail.com",
                    "status": 1,
                    "userPermissions": "EDITOR",
                    "jobPossition": "SEO",
                    "timezone": "Katar",
                    "thumbnail": ""

                },
                {
                    "firstName": "Ryan ",
                    "lastName": "Jones",
                    "email": "t.heines@gmail.com",
                    "status": 1,
                    "userPermissions": "EDITOR",
                    "jobPossition": "SEO",
                    "timezone": "Brasil",
                    "thumbnail": ""

                },
                {
                    "firstName": "Claire",
                    "lastName": "Bloom",
                    "email": "ryan.jones@gmail.com",
                    "status": 1,
                    "userPermissions": "VIEWER",
                    "jobPossition": "SEO",
                    "timezone": "Brasil",
                    "thumbnail": ""

                },
                {
                    "firstName": "Mohamed",
                    "lastName": "Sahini",
                    "email": "t.heines@gmail.com",
                    "status": 1,
                    "userPermissions": "VIEWER",
                    "jobPossition": "SEO",
                    "timezone": "Katar",
                    "thumbnail": ""

                },
                {
                    "firstName": "Samantha ",
                    "lastName": "Finnes",
                    "email": "t.heines@gmail.com",
                    "status": 1,
                    "userPermissions": "VIEWER",
                    "jobPossition": "SEO",
                    "timezone": "Brasil",
                    "thumbnail": ""

                },
                {
                    "firstName": "Alina",
                    "lastName": "D.",
                    "email": "alina.d@gmail.com",
                    "status": 0,
                    "userPermissions": "VIEWER",
                    "jobPossition": "SEO",
                    "timezone": "Katar",
                    "thumbnail": ""

                },
                {
                    "firstName": "Jeffrey  ",
                    "lastName": "Stansfield",
                    "email": "stanfiled.jeff@gmail.com",
                    "status": 0,
                    "userPermissions": "VIEWER",
                    "jobPossition": "SEO",
                    "timezone": "Brasil",
                    "thumbnail": ""

                }
        ]
    });

});


router.post('/', async(req, res, next) => {
    // const browser = await puppeteer.launch();
    console.log('event post',req.body);

    res.status(200).json({'project':'project post is added successfully'})
});

module.exports = router;
