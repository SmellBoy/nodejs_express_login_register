
// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
	sqllogin: 'select count(1) as flag from login where username=? and password=?;',
	sqlregister: 'insert into login(id, username, password) values(0,?,?);'
};
 
module.exports = user;
