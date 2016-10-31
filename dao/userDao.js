
// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');
 
// 使用连接池，提升性能
var pool  = mysql.createPool($conf.mysql);
// var pool = mysql.createPool(
// 	{
// 		host: '127.0.0.1', 
// 		user: 'root',
// 		password: '123456',
// 		database:'test1', // 前面建的user表位于这个数据库中
// 		port: 3306
// 	}
// );
// pool.connect();
// console.log('database connect test:');
// pool.query('select * from login', function(err, rows, fields) {
//   if (err) throw err;
//   console.log('The solution is: ', rows[0]);
// });

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
// console.log(1000);
module.exports = {
	userlogin: function (req, res, next) {
		// console.log(1111);
		var param = req.body;
        if(param.username == null || param.password == null) {
			// console.log(0000);
            //jsonWrite(res, undefined);
            return;
        }
		pool.getConnection(function(err, connection) {
			// console.log(0001);
			connection.query($sql.sqllogin, [param.username, param.password], function(err, result) {
				var propertys = Object.getOwnPropertyNames(result[0]);
				console.log(propertys);
				console.log(result);
                console.log(result.flag);
                if(result[0].flag){
                	console.log(1111111111111111);
                	res.render('suc');
                }
                else{
                	console.log(0000000000000000);   
                	res.render('fail');             	
                };
                // jsonWrite(res, result);
				connection.release();
			});
		});
 
	},

	add: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			var param = req.query || req.params;
			connection.query($sql.sqlregister, [param.username, param.password], function(err, result) {
				// var propertys = Object.getOwnPropertyNames(result[0]);
				// console.log(propertys);
				console.log(result);
				if(result) {
					result = {
						code: 200,
						msg:'增加成功'
					};
				}
				jsonWrite(res, result);
				connection.release();
			});
		});
	},

	userregister: function (req, res, next) {
		console.log(0000);
		var param = req.body;
        if(param.username == null || param.password == null) {
			console.log(0000);
            //jsonWrite(res, undefined);
            return;
        }
		pool.getConnection(function(err, connection) {
			console.log(0001);
			connection.query($sql.sqlregister, [param.username, param.password], function(err, result) {
				console.log(result);
                if(result.affectedRows > 0){
                	console.log(1111111111111111);
                	res.render('suc1');
                }
                else{
                	console.log(0000000000000000);   
                	res.render('fail');             	
                };
                // jsonWrite(res, result);
				connection.release();
			});
		});
 
	},

	test: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			connection.query($sql.sqltest, function(err, result) {
				var propertys = Object.getOwnPropertyNames(result[0]);
				console.log(propertys);
				console.log(result);
				if(result) {
					result = {
						code: 200,
						msg:'成功'
					};
				}
				jsonWrite(res, result);
				connection.release();
			});
		});
	}
 
};