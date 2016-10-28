
// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
	login: 'select count(1) as flag from login where username=? and password=?;'
};
 
module.exports = user;