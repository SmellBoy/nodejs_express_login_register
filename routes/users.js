
var express = require('express');
var router = express.Router();
 
var userDao = require('../dao/userDao');
 
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.sender('login');
});
 
// 增加用户
//TODO 同时支持get,post
 
router.post('/login', function(req, res, next) {
	userDao.login(req, res, next);
});
 
module.exports = router;