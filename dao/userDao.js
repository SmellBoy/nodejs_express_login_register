
// dao/userDao.js
// 实现与MySQL交互
var mysql = require('mysql');
var $conf = require('../conf/db');
var $util = require('../util/util');
var $sql = require('./userSqlMapping');
 
// 使用连接池，提升性能
var pool  = mysql.createPool($util.extend({}, $conf.mysql));
 
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
	userlogin: function (req, res, next) {
		console.log(1111);
		var param = req.body;
        if(param.username == null || param.password == null) {
			console.log(0000);
            //jsonWrite(res, undefined);
            return;
        }
		pool.getConnection(function(err, connection) {
			connection.query($sql.sqllogin, [param.username, param.password], function(err, result) {
				if(result.affectedRows > 0) {
                    res.render('suc', {
                        result: result
                    }); 
                } else {
                    res.render('fail',  {
                        result: result
                    });
                }
                console.log(result);
				console.log(result.flag);
				connection.release();
			});
		});
 
	},

	add: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			var param = req.query || req.params;
			connection.query($sql.sqlregister, [param.username, param.password], function(err, result) {
				if(result) {
					result = {
						code: 200,
						msg:'增加成功'
					};
				}
				connection.release();
			});
		});
	}
 
};