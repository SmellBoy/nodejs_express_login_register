
// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
//var $util = require('../util/util');
var $sql = require('./userSqlMapping');
 
// 使用连接池，提升性能
//var pool  = mysql.createPool($util.extend({}, $conf.mysql));
var pool  = mysql.createPool( $conf.mysql );
 
// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};
 
module.exports = {
	login: function (req, res, next) {
		// update by id
		// 为了简单，要求同时传name和age两个参数
		var param = req.body;
		if(param.username == null || param.password == null || param.id == null) {
			jsonWrite(res, undefined);
			return;
		}
 
		pool.getConnection(function(err, connection) {
			connection.query($sql.login, [param.username, param.password], function(err, result) {
				console.log(result);
				jsonWrite(res, result);
				connection.release();
			});
		});
 
	}
 
};
