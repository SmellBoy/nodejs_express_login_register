
// dao/userSqlMapping.js
// CRUD SQL语句
var user = {
	sqllogin: 'select count(1) as flag from login where name=? and password=?;',
	//sqllogin: 'select * from login where name=? and password=?;',
	sqlregister: 'insert into login(id, name, password) values(0,?,?);',
	sqltest: 'select * from login;'
};
 
module.exports = user;
