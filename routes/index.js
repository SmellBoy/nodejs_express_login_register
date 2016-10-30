var express = require('express');
var router = express.Router();

/* GET index page. */
router.get('/', function(req, res,next) {
  res.render('index', { title: 'Data Center' });    
});

// /* GET login page. */
// router.route("/login").get(function(req,res){    
//     res.render("login",{title:'User Login'});
// }).post(function(req,res){
	
//     //console.log(req);
//     console.log(1234);
//     //jsonWrite(res, req);
// });


module.exports = router;