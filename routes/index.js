var express = require('express');
var request = require("request");
var cheerio = require("cheerio");
var mysql = require('mysql');
var schedule = require('node-schedule');
var info = require('../public/javascripts/test.js');

var router = express.Router();

var dates_arr = [];

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : info.pw,
  database : info.dbase,
});
connection.connect();

function databasecheck(hour) {
  return new Promise((resolve, reject) => {
     //select
	    	var  sql = 'SELECT time FROM dcard_time';
			connection.query(sql,function (err, result) {
				for (var i = 0; i < result.length; i++) {
					
				if(hour==result[i].time){
					var has=1;
					break;
					}else{
						var has=0;
					}							
				}
				if(has==1){
				var modSql = 'UPDATE dcard_time SET count = count+1 WHERE time=?';
				var modSqlParams = [hour];

				connection.query(modSql,modSqlParams,function (err, result) {
				   if(err){
				         console.log('[UPDATE ERROR] - ',err.message);
				         return;
				   }        
				  console.log('updated!');				  
				});
				

				}else{
				var  addSql = 'INSERT INTO dcard_time(time,count) VALUES(?,?)';
			        var  addSqlParams = [hour,1];

					connection.query(addSql,addSqlParams,function (err, result) {
		        if(err){
		         console.log('[INSERT ERROR] - ',err.message);
		         return;
		        }        
		 			console.log("inserted!");  
		}); 
					
				}
			
		
});
  });
}



var scheduleCronstyle = ()=>{
    schedule.scheduleJob('0 30 22 * * *',()=>{
      request({
    url: "https://www.dcard.tw/f",
    method: "GET"
  }, function(err,res,body) {
    if(!err){
    	// console.log(body);
    	var $ = cheerio.load(body);
		var update_time = $(info.class);

		// console.log(update_time);
	    for(var i=0;i<update_time.length;i++) {
	      dates_arr.push(($(update_time[i]).text().toString().split(" "))[1]); 
	      // console.log((dates_arr[i].toString().split(" "))[1]);
	      // console.log((dates_arr[i].toString().split(":"))[0]);
	      var real=parseInt((dates_arr[i].toString().split(":"))[0])+8;
	      if(real>=24){
	      	real=real-24;
	      }
	      console.log(real);
	     databasecheck(real);
	    }
	   
		
    }
    	
  });

 

    }); 
}

scheduleCronstyle();

  
  // request({
  //   url: "https://www.dcard.tw/f",
  //   method: "GET"
  // }, function(err,res,body) {
  //   if(!err){
  //   	// console.log(body);
  //   	var $ = cheerio.load(body);
		// var update_time = $(info.class);

		// // console.log(update_time);
	 //    for(var i=0;i<update_time.length;i++) {
	 //      dates_arr.push(($(update_time[i]).text().toString().split(" "))[1]); 
	 //      // console.log((dates_arr[i].toString().split(" "))[1]);
	 //      // console.log((dates_arr[i].toString().split(":"))[0]);
	 //      var real=parseInt((dates_arr[i].toString().split(":"))[0])+8;
	 //      if(real>=24){
	 //      	real=real-24;
	 //      }
	 //      console.log(real);
	 //     databasecheck(real);
	 //    }
	   
		
  //   }
    	
  // });

/* GET home page. */
router.get('/', function(req, res, next) {
var send=[];
	var  sql = 'SELECT * FROM dcard_time ORDER BY time';
			connection.query(sql,function (err, result) {
				for (var i = 0; i < result.length; i++) {
					send.push(result[i].count);
				}
				console.log(send);
				res.render('index', { data_array: send });
  });
 
});
// console.log(dates_arr[0]);
module.exports = router;
