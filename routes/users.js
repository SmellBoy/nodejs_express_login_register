
var express = require('express');
var router = express.Router();
 
var userDao = require('../dao/userDao');
 
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('/login');
});
router.get('register', function(req, res, next) {
  res.render('/register');
});


router.post('/login', function(req, res, next) {
	userDao.userlogin(req, res, next);
});

router.post('/register', function(req, res, next) {
	userDao.userregister(req, res, next);
});

router.get('/addUser', function(req, res, next) {
	userDao.add(req, res, next);
});

router.get('/testUser', function(req, res, next) {
	userDao.test(req, res, next);
});


module.exports = router;
