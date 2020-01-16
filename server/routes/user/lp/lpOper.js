/*
 * ETP REGISTER 위한 라우팅 함수 정의
 *
 * @date 2019-02-08
 * @author ThreeOn
 */
var config = require('../../../config/config');
var mconfig = require('../../../database/mysql_config');
var logg = require('../../../util/logg');
var Promise = require("bluebird");

/*
 * ETP 운용관리 - ETP 운영정보를 조회한다.
 * 2019-05-03  bkLove(촤병국)
 */
var getLpOperInfo = function(req, res) {
  try {
    logg.debug('lpOper.getLpOperInfo 호출됨.');
    var pool = req.app.get("pool");
    var mapper = req.app.get("mapper");
    var resultMsg = {};
    /* 1. body.data 값이 있는지 체크 */
    if(!req.body.data) {
      logg.error("[error] lpOper.getLpOperInfo  req.body.data no data.", req.body.data);
      resultMsg.result = false;
      resultMsg.msg = config.MSG.error01;
      throw resultMsg;
    }
    var paramData = JSON.parse(JSON.stringify(req.body.data));
    paramData.inst_cd = (req.session.inst_cd ? req.session.inst_cd : "");
    paramData.type_cd = (req.session.type_cd ? req.session.type_cd : "");

    var stmt = "";
    Promise.using(pool.connect(), conn => {
      try {
        /* 1. EtpBasic 의 기본정보를 조회한다. */
        stmt = mapper.getStatement('lpOper', 'getLpOperInfo', paramData, mconfig.format);
        logg.debug(stmt, paramData);
        conn.query(stmt, function(err, rows) {
          if(err) {
            logg.error(err, stmt, paramData);
            resultMsg.result = false;
            resultMsg.msg = config.MSG.error01;
            resultMsg.err = err;
          } else if(rows && rows.length > 0) {
            resultMsg.result = true;
            resultMsg.msg = "";
            resultMsg.dataList = rows;
          }
          res.json(resultMsg);
          res.end();
        });
      } catch (err) {
        logg.error(err, stmt, paramData);
        resultMsg.result = false;
        resultMsg.msg = config.MSG.error01;
        resultMsg.err = err;
        res.json(resultMsg);
        res.end();
      }
    });
  } catch (expetion) {
    logg.error(expetion, paramData);
    resultMsg.result = false;
    resultMsg.msg = config.MSG.error01;
    resultMsg.err = expetion;
    resultMsg.dataList = [];
    res.json(resultMsg);
    res.end();
  }
}
module.exports.getLpOperInfo = getLpOperInfo;
