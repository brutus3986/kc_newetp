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
          if(link == Config.location || link == (Config.location + '/')) {
            toPath = Config.pc_home;
            this.routeToPath(toPath);
          }else {
            toPath = link.split(Config.location)[1];
            console.log("toPath: " + toPath);

            if(toPath.indexOf("etpregister") > 0) {
              const pid = toPath.split("PID=")[1];
              console.log("pid : " + pid);
              toPath = "/home/etp/register"
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
        this.$router.push({
          path: topath,
        });
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