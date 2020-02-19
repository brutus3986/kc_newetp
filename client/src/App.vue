<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Config from "@/js/config.js"
  import Util from "@/js/common/tool/util.js"
  import Constant from "@/store/store_constant.js"
  export default {
    name: 'app',
    data() {
      return {
        // IndexMast: [],
        // EtpMast: [],
        ws: null,
      }
    },
    components: {
    },
    created() {
      // 실시간 데이터 테스트 완료 (2019.11.02)
      // this.initWebSocket();
      // ETP / INDEX MASTER 처리 (초기 접속 속도 문제로 블록킹)
      // this.getEtpMast();
      // this.getIndexMast();
      // PC / MOBILE 분기 처리
      const filter = "win16|win32|win64|mac|macintel";
      console.log("Created..........");
      console.log(navigator.platform);

      const link = document.location.href; 
      console.log(link);
      console.log(Config.location);

      let toPath = '';
      if(navigator.platform) {
        if(filter.indexOf(navigator.platform.toLowerCase()) < 0) {
          toPath = Config.mobile_home;
          this.routeToPath(toPath);
        } else {
          toPath = Config.pc_home;
          if(link == Config.location || link == (Config.location + '/')) {
            this.routeToPath(toPath);
          }else {
            toPath = link.split(Config.location)[1];
            console.log("toPath: " + toPath);

            if(toPath.indexOf("do=etpregister") > 0) {
              this.routePidAutoLogin(toPath);
            }else if(toPath.indexOf("do=reload") > 0) {
              this.routeReload();
            }else {
              this.routeToPath(toPath);
            }
          }
        }
      }
    },
    mounted: function() {
      this.setBefDates();
    },
    methods: {
      // 실시간 데이터 테스트 완료 (2019.11.02)
      /*
      initWebSocket: function() {
        console.log("initWebSocket..........");
        var vm = this;
        this.socket = new WebSocket(Config.ws_url);
        this.socket.onopen = function() {
          console.log("Connected......");
          vm.socket.send(JSON.stringify({msg: "CLIENT TEST"}));
        }
        this.socket.onmessage = function(recv) {
          console.log("onmessage..........");
          console.log(recv.data);
          var rMsg = JSON.parse(recv.data);
          vm.$EventBus.$emit(rMsg.event, rMsg);
          // var tmp = JSON.parse(recv.data)
          // console.log(tmp.msg);
        }
      },
      */
      routeToPath: function(topath) {
        console.log("routeToPath : " + topath);
        this.$router.push({
          path: topath,
        });
      },
      routePidAutoLogin: function(topath) {
        let vm = this;
        let nDate = new Date();
        const pid = topath.split("PID=")[1];
        let toPath = "/home/etp/register"

        console.log("pid : " + pid);
        console.log("topath : " + toPath + " pid : " + pid);
        axios.post(Config.base_url + '/user/member/userpidcheck', {
          "pid": pid,
        }).then(async function(response) {
          // console.log(response);
          if(response.data.success == false) {
            localStorage.clear();
            console.log("PID CHECK FALSE");
            vm.routeToPath(Config.pc_home);
          } else {
            // let nDate = new Date();
            let userData = response.data.results[0];
            vm.$store.commit(Constant.ADD_USER, {
              email: userData.email,
              name: userData.name,
              type_cd: userData.type_cd,
              type_name: userData.type_name,
              inst_cd: userData.inst_cd,
              inst_name: userData.inst_name,
              krx_cd: userData.krx_cd,
              hp_no: userData.hp_no,
              tel_no: userData.tel_no,
              lp_auth: userData.lp_auth,
              simul_auth: userData.simul_auth,
            });
            localStorage.clear();
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('loginDt', nDate.getTime());
            vm.routeToPath(toPath);
          }
        });
      },
      routeReload: function() {
        let loginDt = localStorage.getItem('loginDt');
        let user = JSON.parse(localStorage.getItem('user'));
        let nDate = new Date();
        let nTerm = nDate.getTime() - Number(loginDt);
        let toPath = Config.pc_home;

        console.log("App.vue.............reload");
        console.log("loginDt : " + loginDt + " nDate : " + nDate + "nTerm : " + nTerm);
        // 새로 고침(F5) 처리
        if(loginDt !== null && nTerm < 600000) {
          toPath = localStorage.getItem('finalPath');
          console.log("toPath : " + toPath);

          if(toPath !== null) {
            if(user !== null) {
              this.$store.commit(Constant.ADD_USER, user);
            }
          }else {
            toPath = Config.pc_home;
          }
        }
        this.routeToPath(toPath);
      },
      setBefDates: function() {
        let befDates = {};
        befDates.bef1Week = Util.getBef1Week();
        befDates.bef1Month = Util.getBef1Month();
        befDates.bef3Month = Util.getBef3Month();
        befDates.bef6Month = Util.getBef6Month();
        befDates.befYtd = Util.getBefYtd();
        befDates.bef1Year = Util.getBef1Year();
        befDates.bef3Year = Util.getBef3Year();
        befDates.bef5Year = Util.getBef5Year();
        befDates.bef10Year = Util.getBef10Year();
        this.$store.commit(Constant.SET_BEF_DATES, befDates);
      },
      getEtpMast: function() {
        let vm = this;
        // console.log("App.vue : getEtpMast");
        axios.get(Config.base_url + "/user/marketinfo/getEtpMast", {
          params: {}
        }).then(response => {
          // console.log(response);
          if(response.data.success == false) {
            // alert("ETP정보가 없습니다.");
          } else {
            vm.$store.commit(Constant.SET_ETP, response.data.results);
          }
        });
      },
      getIndexMast: function() {
        let vm = this;
        // console.log("App.vue : getIndexMast");
        axios.get(Config.base_url + "/user/marketinfo/getIndexMast", {
          params: {}
        }).then(response => {
          // console.log(response);
          if(response.data.success == false) {
            // alert("지수정보가 없습니다.");
          } else {
            vm.$store.commit(Constant.SET_INDEX, response.data.results);
          }
        });
      },
    },
  }
</script>
<style>
</style>