/**
 * DEVWEB
 * @date 2018-07-30
 * @author ThreeOn
 */

// Express 기본 모듈 불러오기
const express = require('express'),
  http = require('http'),
  path = require('path');

var bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    static = require('serve-static'),
    cors = require('cors'),
    fs = require('fs');
    // errorHandler = require('errorhandler');

var logg = require('./util/logg');

// 에러 핸들러 모듈 사용 
// express-error-handler 못 가져옴 (이유를 모르겠슴)
var expressErrorHandler = require('express-error-handler');
// var expressErrorHandler = require('./util/error-handler');

// Session 미들웨어 불러오기
var expressSession = require('express-session');
var mysqlStore = require('express-mysql-session')(expressSession);

// connect-flash 미들웨어 불러오기
var flash = require('connect-flash');

// 모듈로 분리한 설정 파일 불러오기
var config = require('./config/config');
var mysql_config = require('./database/mysql_config');

// 모듈로 분리한 설정 파일 불러오기
var cron = require('./config/cron_scheduler');

// 모듈로 분리한 라우팅 파일 불러오기
var route_loader = require('./routes/route_loader');

// connectionPool 객체
const Pool = require("./database/pool");
const pool = new Pool();

// 익스프레스 객체 생성
var app = express();

app.set("pool", pool);

//app.set("stmt", pool.getStmts());
app.set("mapper", pool.getMapper());

//===== 서버 변수 설정  =====//
console.log('config.server_port : %d', config.server_port);
app.set('port', config.server_port); //8021

//Cross Origin Resource Sharing
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  return next();
});

//app.use(cors(corsOptions));
// app.options('*', cors());

// body-parser를 이용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))

// body-parser를 이용해 application/json 파싱
app.use(bodyParser.json( {limit: '10mb', extended: true}, ))

// cookie-parser 설정
app.use(cookieParser());

// 세션 설정
app.use(expressSession({
  secret: '!@!!#!#!#!@$^#$$#%#$%#%$%#%#$#$',
  resave: false,
  saveUninitialized: true,
  store : new mysqlStore({
    host: mysql_config.host,
    port: mysql_config.port,
    user: mysql_config.user,
    password: mysql_config.password,
    database: mysql_config.database,
  }),
})); 

// public 폴더를 static으로 오픈
app.use(static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, 'public')));

//라우팅에 대한 사전 세션체크 (개발시 체크 하지 않음)
if (config.runenv == "dev") {
  route_loader.sessionCheckRegister(app);
} else {
  route_loader.sessionCheckRegister(app);
}

//라우팅 정보를 읽어들여 라우팅 설정
var router = express.Router();
route_loader.routerInit(app, router);

//===== 404 에러 페이지 처리 =====//
app.get('*', function(req, res) {
  res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});
  fs.readFile(__dirname + '/public/error/404.html', (err, data) => {
    res.end(data, 'utf-8');
  });
});
// express-error-handler 못 가져옴
/*
var errorHandler = expressErrorHandler({
  static: {
      '404': './public/error/404.html'
  }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);
*/

// cron 작업 등록
cron.init(app); 

//===== 서버 시작 =====//

//확인되지 않은 예외 처리 - 서버 프로세스 종료하지 않고 유지함
process.on('uncaughtException', function(err) {
  logg.error('uncaughtException 발생함 : ' + err);
  logg.info('서버 프로세스 종료하지 않고 유지함.');

  if( err && err.stack ) {
    logg.error(err.stack);
  }
});

// 프로세스 종료 시에 데이터베이스 연결 해제
process.on('SIGTERM', function() {
  logg.info("프로세스가 종료됩니다.");
  app.close();
});

app.on('close', function() {
  logg.info("Express 서버 객체가 종료됩니다.");
});

// 시작된 서버 객체를 리턴받도록 합니다. 
var server = http.createServer(app).listen(app.get('port'), function(req, res) {
  logg.info('서버가 시작되었습니다. 포트 : ' + app.get('port'));
});

// 실시간 데이터 처리 테스트 완료
/*
const webSocket = require("./routes/websocket/web_socket");
webSocket(server);
*/

server.timeout = 350000;
