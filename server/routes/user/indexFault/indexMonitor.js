/*
 * INDEX FaultType 위한 라우팅 함수 정의
 *
 * @date 2019-12-16
 * @author ThreeOn
 */
var Promise = require("bluebird");
const mconfig = require('../../../database/mysql_config');

var getEtpList = function(req, res) {
  console.log('indexMonitor 모듈 안에 있는 getEtpList 호출됨.');

  var pool = req.app.get("pool");
  var mapper = req.app.get("mapper");
  var paramData = req.query;
  // console.log(paramData);
  var stmt = mapper.getStatement('indexMonitor', 'selectEtpList', paramData, mconfig.format);
  // console.log(stmt);
  
  Promise.using(pool.connect(), conn => {
    try {
      conn.query(stmt, function(err, rows) {
        if (!err){
          if(rows.length > 0) {
            // console.log('The solution is: ', rows);
            res.json({ success: true, results: rows });
            res.end();
          }else {
            var msg = '등록된 리스트가 없습니다.';
            // console.log(msg);
            res.json({ success: false, message: msg });
            res.end();
          }
        }else{
          console.log('Error while performing Query.', err);
          res.json({ success: false, message: err });
          res.end();
        }        
      });
    } catch (expetion) {
      console.log('Error while performing Query.', err);
      res.json({ success: false, message: err });
      res.end();
    }
  });
};
  
var getIndexList = function(req, res) {
  console.log('indexMonitor 모듈 안에 있는 getIndexList 호출됨.');

  var pool = req.app.get("pool");
  var mapper = req.app.get("mapper");
  var paramData = req.query;
  // console.log(paramData);
  var stmt = mapper.getStatement('indexMonitor', 'selectIndexList', paramData, mconfig.format);
  // console.log(stmt);
  
  Promise.using(pool.connect(), conn => {
    try {
      conn.query(stmt, function(err, rows) {
        if (!err){
          if(rows.length > 0) {
            // console.log('The solution is: ', rows);
            res.json({ success: true, results: rows });
            res.end();
          }else {
            var msg = '등록된 리스트가 없습니다.';
            // console.log(msg);
            res.json({ success: false, message: msg });
            res.end();
          }
        }else{
          console.log('Error while performing Query.', err);
          res.json({ success: false, message: err });
          res.end();
        }        
      });
    } catch (expetion) {
      console.log('Error while performing Query.', err);
      res.json({ success: false, message: err });
      res.end();
    }
  });
};

module.exports.getEtpList = getEtpList;
module.exports.getIndexList = getIndexList;
