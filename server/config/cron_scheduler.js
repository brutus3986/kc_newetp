/**
 * CRON SCHEDULER
 * 
 * @date 2018-09-17
 * 
 * @author ThreeOn
 */

var cron_scheduler = {};

var cron = require('node-cron');
var fs = require('fs');
var Promise = require("bluebird");
var logg = require('../util/logg');
var config = require('./config');
var mconfig = require('../database/mysql_config');

cron_scheduler.init = function(app) {
	logg.info('cron_scheduler.init 호출됨.');
	return cronRegister(app);
};

// route_info에 정의된 라우팅 정보 처리
function cronRegister(app) {
  // cron 작업 등록
  if(config.runenv == 'prod') {
    cron.schedule('*/10 * * * 1-5', function(){
      // logg.info('dailyCronJob 작업 실행 : ');
      console.log('dailyCronJob 작업 실행 : ');
      etpIndexMonitor(app);
    });
  }
}

async function etpIndexMonitor(app) {
  const pool = app.get("pool");
  const mapper = app.get("mapper");

  const rawdata = fs.readFileSync(config.index_monitor, 'UTF-8');
  const lines = rawdata.split(/\r?\n/);

  let paramData = {};
  let stmt = '';
  // print all lines
  for(const line of lines) {
    const code = line.substring(0, 12);
    const yn = line.substring(12, 13);
    // console.log(`code : ${code} yn : ${yn}`);

    if(code != '' && yn !== '') {
      paramData = {'code': code, 'yn': yn};
      // console.log(paramData);
      stmt = mapper.getStatement('indexMonitor', 'updateIndexMonitor', paramData, mconfig.format);
      // console.log(stmt);
      await Promise.using(pool.connect(), async(conn) => {
        try {
          await conn.query(stmt, function(err, rows) {
            if (!err){

            }else{
              console.log('Error while performing Query.', err);
            }        
          });
        } catch (expetion) {
          console.log('Error while performing Query.', err);
        }
      });
    }
  }
}

module.exports = cron_scheduler;

