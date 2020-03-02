/*
 * ISELECT API 위한 라우팅 함수 정의
 *
 * @date 2020-03-02
 * @author ThreeOn
 */
var config = require('../../config/config');
var requestIp = require('request-ip');
var Promise = require("bluebird");
const dbconfig = require('../../database/mysql_config');

var getIselectJong = function(req, res) {
  console.log('[iselectApi.js] 모듈 안에 있는 getIselectJong 호출됨.');

  var inItem = {};

  if(req.method == 'GET') {
    inItem.inst_cd = req.query.inst_cd;
    inItem.user_ip = req.query.user_ip;
    inItem.auth_key = req.query.auth_key;
    inItem.idx_code = req.query.idx_code;
  }else {
    inItem.inst_cd = req.body.inst_cd;
    inItem.user_ip = req.body.user_ip;
    inItem.auth_key = req.body.auth_key;
    inItem.idx_code = req.body.idx_code;
  }

  if(inItem.user_ip == undefined) {
    var tmpip = requestIp.getClientIp(req);
    console.log("tmpip.......");
    console.log(tmpip);
    tmpip = tmpip.split(':').slice(-1);
  	inItem.user_ip = tmpip[0];
/*
  	inItem.user_ip = requestIp.getClientIp(req);
    inItem.user_ip = inItem.user_ip.split(':').slice(-1);
*/
    console.log("undefined............");
    console.log(inItem);
  }
  // console.log("user_ip : " + inItem.user_ip);
  var pool = req.app.get("pool");
  var mapper = req.app.get("mapper");
  var stmt = mapper.getStatement('iselectApiMember', 'selectApiMemberCheck', inItem, dbconfig.format);
  console.log(stmt);
  
  Promise.using(pool.connect(), conn => {
    try {
      conn.query(stmt, function(err, rows) {
        if (!err){
          if(rows.length > 0) {
            console.log('The ISELECT API member is: ', rows);
            selectJisuJong(req, res, inItem);
          }else {
            var msg = 'No Member!!';
            console.log(msg);
            res.json({ success: false, message: msg });
            res.end();
          }
        }else{
          console.log(inItem);
          var msg = 'Not Correct INST CODE, USER IP, AUTH KEY!!';
          console.log(msg);
          res.json({ success: false, message: msg });
          res.end();
        }        
      });
    } catch (err) {
      console.log('Error while performing Query.', err);
      res.json({ success: false, message: err });
      res.end();
    }
  });    
}

var selectJisuJong = function(req, res, inItem) {
  console.log('[iselectApi.js] 모듈 안에 있는 selectJisuJong 호출됨.');

  var pool = req.app.get("pool");
  var mapper = req.app.get("mapper");
  var stmt = mapper.getStatement('iselectApi', 'selectJisuJong', inItem, dbconfig.format);
  console.log(stmt);
  
  Promise.using(pool.connect(), conn => {
    try {
      conn.query(stmt, function(err, rows) {
        if (!err){
          if(rows.length > 0) {
            // console.log('The solution is: ', rows);
            res.json({ success: true, results: rows });
            res.end();

            inItem.reply_cnt = rows.length;
          }else {
            var msg = 'No Data!!';
            // console.log(msg);
            res.json({ success: false, message: msg });
            res.end();

            inItem.reply_cnt = 0;
          }
          inItem.gubun = 'J';
          insertApiLog(req, inItem);
      }else{
          throw err;
        }        
      });
    } catch(err) {
      console.log('Error while performing Query.', err);
      res.json({ success: false, message: err });
      res.end();
    }
  });
}

var insertApiLog = function(req, inItem) {
  var pool = req.app.get("pool");
  var mapper = req.app.get("mapper");
  
  var stmt = mapper.getStatement('iselectApiLog', 'insertApiLog', inItem, config.format);
  console.log(stmt);
  
  Promise.using(pool.connect(), conn => {
    try {
      conn.query(stmt, function(err, rows) {
        if (!err){
          console.log('[iselectApi.js] insertApiLog success');
        }else{
          throw err;
        }        
      });
    } catch (err) {
      console.log('[iselectApi.js] insertApiLog fail : ');
      console.log(err);
    }
  });  
}

var getIselectInfo = function(req, res) {
  console.log('[iselectApi.js] 모듈 안에 있는 getFnjisuInfo 호출됨.');

  var inItem = {};

  if(req.method == 'GET') {
    inItem.inst_cd = req.query.inst_cd;
    inItem.user_ip = req.query.user_ip;
    inItem.auth_key = req.query.auth_key;
    inItem.idx_code = req.query.idx_code;
  }else {
    inItem.inst_cd = req.body.inst_cd;
    inItem.user_ip = req.body.user_ip;
    inItem.auth_key = req.body.auth_key;
    inItem.idx_code = req.body.idx_code;
  }

  if(inItem.user_ip == undefined) {
    var tmpip = requestIp.getClientIp(req);
    console.log("tmpip.......");
    console.log(tmpip);
    tmpip = tmpip.split(':').slice(-1);
  	inItem.user_ip = tmpip[0];
/*
  	inItem.user_ip = requestIp.getClientIp(req);
    inItem.user_ip = inItem.user_ip.split(':').slice(-1);
*/
    console.log("undefined............");
    console.log(inItem);
  }
  // console.log("user_ip : " + inItem.user_ip);
  var pool = req.app.get("pool");
  var mapper = req.app.get("mapper");
  var stmt = mapper.getStatement('iselectApiMember', 'selectApiMemberCheck', inItem, dbconfig.format);
  console.log(stmt);
  
  Promise.using(pool.connect(), conn => {
    try {
      conn.query(stmt, function(err, rows) {
        if (!err){
          if(rows.length > 0) {
            console.log('The ISELECT API member is: ', rows);
            selectJisuInfo(req, res, inItem);
          }else {
            var msg = 'No Member!!';
            console.log(msg);
            res.json({ success: false, message: msg });
            res.end();
          }
        }else{
          console.log(inItem);
          var msg = 'Not Correct INST CODE, USER IP, AUTH KEY!!';
          console.log(msg);
          res.json({ success: false, message: msg });
          res.end();
        }        
      });
    } catch (err) {
      console.log('Error while performing Query.', err);
      res.json({ success: false, message: err });
      res.end();
    }
  });    
}

var selectJisuInfo = function(req, res, inItem) {
  console.log('[iselectApi.js] 모듈 안에 있는 selectJisuInfo 호출됨.');

  var pool = req.app.get("pool");
  var mapper = req.app.get("mapper");
  var stmt = mapper.getStatement('iselectApi', 'selectJisuInfo', inItem, dbconfig.format);
  console.log(stmt);
  
  Promise.using(pool.connect(), conn => {
    try {
      conn.query(stmt, function(err, rows) {
        if (!err){
          if(rows.length > 0) {
            // console.log('The solution is: ', rows);
            res.json({ success: true, results: rows });
            res.end();

            inItem.reply_cnt = rows.length;
          }else {
            var msg = 'No Data!!';
            // console.log(msg);
            res.json({ success: false, message: msg });
            res.end();

            inItem.reply_cnt = 0;
          }
          inItem.gubun = 'D';
          insertApiLog(req, inItem);
      }else{
          throw err;
        }        
      });
    } catch(err) {
      console.log('Error while performing Query.', err);
      res.json({ success: false, message: err });
      res.end();
    }
  });
}

module.exports.getIselectJong = getIselectJong;
module.exports.getIselectInfo = getIselectInfo;
