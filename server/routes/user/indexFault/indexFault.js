/*
 * INDEX FaultType 위한 라우팅 함수 정의
 *
 * @date 2019-12-16
 * @author ThreeOn
 */
var Promise = require("bluebird");
const config = require('../../../database/mysql_config');
const uconfig = require('../../../config/config');

var getIndexFaultTotcnt = function(req, res) {
  console.log('indexfault 모듈 안에 있는 getIndexFaultTotcnt 호출됨.');

  var pool = req.app.get("pool");
  var mapper = req.app.get("mapper");
  var paramData = req.query;
  var stmt = mapper.getStatement('indexFault', 'selectIndexFaultTotcnt', paramData, config.format);
  console.log(stmt);
  
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
          throw err;
        }        
      });
    } catch (err) {
      console.log('Error while performing Query.', err);
      res.json({ success: false, message: err });
      res.end();
    }
  });
};

var getIndexFaultList = function(req, res) {
  console.log('indexfault 모듈 안에 있는 getIndexFaultList 호출됨.');

  var pool = req.app.get("pool");
  var mapper = req.app.get("mapper");
  var paramData = req.query;
  paramData.page = (paramData.page - 1) * paramData.perPage; // 0부터 시작
  var stmt = mapper.getStatement('indexFault', 'selectIndexFaultList', paramData, config.format);
  console.log(stmt);
  
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

var getIndexFaultFile = function(req, res) {
  console.log('indexfault 모듈 안에 있는 getIndexFaultFile 호출됨.');
  let paramData = req.query;
  
  let downFile = uconfig.index_fault_path + "/" + paramData.save_file_name;
  console.log("filename : " + downFile);
  res.download(downFile);
};

var getIndexAgencyList = function(req, res) {
  console.log('indexAgency 모듈 안에 있는 getIndexAgencyList 호출됨.');

  var pool = req.app.get("pool");
  var mapper = req.app.get("mapper");
  var paramData = req.body;
  var stmt = mapper.getStatement('indexFault', 'selectIndexAgencyList', paramData, config.format);
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

module.exports.getIndexFaultTotcnt = getIndexFaultTotcnt;
module.exports.getIndexFaultList = getIndexFaultList;
module.exports.getIndexFaultFile = getIndexFaultFile;
module.exports.getIndexAgencyList = getIndexAgencyList;
