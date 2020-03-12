<template>
  <v-container>
    <v-layout row wrap class="content_margin">
      <div>
      <!--세계시각정보 시작-->
      <v-flex xs12>
        <v-layout row wrap>
          <v-flex xs06>
            <v-card flat class="mr-1 world-time">
              <div class="top1">
                <h6>
                  <img class="flags" src="/assets/img/icons/flag-kr.gif" alt="South Korea Flag">
                  <span>서울</span> 
                  <em class="today">{{Time1.ddate}}</em>
                </h6>
              </div>
              <div class="down1">
                <p>{{Time1.day}} <strong>{{Time1.time}}</strong></p>
              </div>
            </v-card>
          </v-flex>
          <v-flex xs06>
            <v-card flat class="mr-1 world-time">
              <div class="top1">
                <h6>
                  <img class="flags" src="/assets/img/icons/flag-us.gif" alt="USA Flag">
                  <span>뉴욕</span>
                  <em>{{Time2.ddate}}</em"today">
                </h6>
              </div>
              <div class="down1">
                <p>{{Time2.day}} <strong>{{Time2.time}}</strong></p>
              </div>
            </v-card>
          </v-flex>
          <v-flex xs06>
            <v-card flat class="mr-1 world-time">
              <div class="top1">
                <h6>
                  <img class="flags" src="/assets/img/icons/flag-us.gif" alt="USA Flag">
                  <span>시카고</span>
                  <em>{{Time3.ddate}}</em>
                </h6>
              </div>
              <div class="down1">
                <p>{{Time3.day}} <strong>{{Time3.time}}</strong></p>
              </div>
            </v-card>
          </v-flex>
          <v-flex xs06>
            <v-card flat class="mr-1 world-time">
              <div class="top1">
                <h6>
                  <img class="flags" src="/assets/img/icons/flag-uk.gif" alt="UK Flag">
                  <span>런던</span>
                  <em>{{Time4.ddate}}</em>
                </h6>
              </div>
              <div class="down1">
                <p>{{Time4.day}} <strong>{{Time4.time}}</strong></p>
              </div>
            </v-card>
          </v-flex>
          <v-flex xs06>
            <v-card flat class="mr-1 world-time">
              <div class="top1">
                <h6>
                  <img class="flags" src="/assets/img/icons/flag-eu.gif" alt="EUR Flag">
                  <span>유로존</span>
                  <em>{{Time5.ddate}}</em>
                </h6>
                </div>
              <div class="down1">
                <p>{{Time5.day}} <strong>{{Time5.time}}</strong></p>
              </div>
            </v-card>
          </v-flex>
          <v-flex xs06>
            <v-card flat class="mr-0 world-time">
              <div class="top1">
                <h6>
                  <img class="flags" src="/assets/img/icons/flag-cn.gif" alt="China Flag">
                  <span>상해</span>
                  <em>{{Time6.ddate}}</em>
                </h6>
              </div>
              <div class="down1">
                <p>{{Time6.day}} <strong>{{Time6.time}}</strong></p>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <!--세계시각정보 끝 -->
      
      <v-flex grow xs12>
        <v-card flat>
        <div class="title01_w case2">
          <v-card-title primary-title>
            <div class="title_wrap01">
              <h3 class="headline subtit">기초지수 모니터링</h3>
              <v-btn style="background:gray;color:#FFF;" small>전체 : {{mList.length}}</v-btn>
              <v-btn style="background:#90CAF9;color:#FFF;" small>휴장 : {{countHoliday}}</v-btn>
              <v-btn style="background:#FB8C00;color:#FFF;" small>미입수 : {{countNotRecv}}</v-btn>
              <div class="right_btn">
                <span class="toggle2">
                  <v-btn-toggle v-model="sInfo.gubun1" @change="getList()" class="toggle_01">
                    <v-btn flat value="FOR">해외</v-btn>
                    <v-btn flat value="KOR">국내</v-btn>
                  </v-btn-toggle>
                </span>
                <span class="toggle2">
                  <v-btn-toggle v-model="sInfo.gubun2" @change="getList()" class="toggle_01">
                    <v-btn flat value="ETF">ETF</v-btn>
                    <v-btn flat value="ETN">ETN</v-btn>
                  </v-btn-toggle>
                </span>
                <span class="toggle2">
                  <v-btn-toggle v-model="viewGubun" @change="getList()" class="toggle_01">
                    <v-btn flat value="JONG">종목별</v-btn>
                    <v-btn flat value="INDEX">지수별</v-btn>
                  </v-btn-toggle>
                </span>
                <span class="toggle2">
                  <v-btn-toggle v-model="sInfo.gubun3" @change="getList()" class="toggle_01">
                    <v-btn flat value="TOTAL">전체</v-btn>
                    <v-btn flat value="REAL">실시간</v-btn>
                    <v-btn flat value="CLOSE">종가</v-btn>
                  </v-btn-toggle>
                </span>
              </div>
            </div>
          </v-card-title>
          </div>
        </v-card>
        <indexMonitorJong v-if="viewGubun == 'JONG'" :mList="mList" :gubun="sInfo.gubun1"></indexMonitorJong>
        <indexMonitorIndex v-if="viewGubun == 'INDEX'" :mList="mList" :gubun="sInfo.gubun1"></indexMonitorIndex>
      </v-flex>
      </div>
    </v-layout>
    </v-container>
</template>

<script>
import Config       from "@/js/config.js"
import util from "@/js/common/tool/util.js"
import etputil from "@/js/common/tool/etputil.js"
import dateutil from "@/js/common/tool/dateutil.js"
import indexMonitorJong from "./IndexMonitorJong.vue"
import indexMonitorIndex from "./IndexMonitorIndex.vue"

export default {
  data() {
    return {
      mList: [],
      mapItem: {},
      page: 1,
      perPage: 10,
      totcnt: 0,
      totPage: 1,
      viewGubun : 'INDEX',
      sInfo : {
        gubun1 : 'FOR', // FOR / KOR
        gubun2 : 'ETF', // ETF / ETN
        gubun3 : 'TOTAL', // REAL / CLOSE
      },
      ModalFlag: false,
      countHoliday : 0,
      countNotRecv : 0,
      timeId : null,
      Time1 : {},
      Time2 : {},
      Time3 : {},
      Time4 : {},
      Time5 : {},
      Time6 : {},
    }
  },
  components: {
    indexMonitorJong,
    indexMonitorIndex,
  },
  created() {
    this.getTime();    
  },
  destroyed() {
    clearInterval(this.timeId);
  },
  mounted: function() {
    let vm = this;

    this.getIndexList();
    this.timeId = setInterval(function() {
      vm.getTime();
    }, 1000);
    // this.timeId = setInterval(function() {
    //   vm.getDate();
    // }, 60000);
  },
  methods: {
    getTime: function() {
      // 한국, 뉴욕, 시카고, 런던, 유로, 상해
      this.Time1 =  dateutil.getTimeObj();
      this.Time2 = dateutil.getTimeOffsetObj(-13);
      this.Time3 = dateutil.getTimeOffsetObj(-14);
      this.Time4 = dateutil.getTimeOffsetObj(-9);
      this.Time5 = dateutil.getTimeOffsetObj(-8);
      this.Time6 = dateutil.getTimeOffsetObj(-1);
    },
    getList: function() {
      if(this.viewGubun == 'JONG') {
        this.getEtpList();
      }else {
        this.getIndexList();
      }
    },
    getEtpList: function() {
      let vm = this;

      axios.get(Config.base_url+'/user/indexMonitor/getetplist', {
        params: {
          gubun1 : vm.sInfo.gubun1,
          gubun2 : vm.sInfo.gubun2,
          gubun3 : vm.sInfo.gubun3,
        }
      }).then(function(response) {
        if(response.data.success == false){
          alert(response.data.message);
        }else {
          // console.log(tList);
          // 잦은 렌더링 방지
          let tList = []; 
          let pList = response.data.results;
          vm.countHoliday = 0;
          vm.countNotRecv = 0;
          for(let i = 0; i < pList.length; i++) {
            let tmp = JSON.parse(JSON.stringify(pList[i]));
            tmp.dStyle = util.getUpAndDownStyle(tmp.F15004);
            tmp.nStyle = util.getUpAndDownStyle(tmp.F15303);
            tmp.iStyle = util.getUpAndDownStyle(tmp.F15319);

            if(vm.sInfo.gubun1 == 'FOR') {
              let val = 0;
              tmp.recv_for_index = (tmp.recv_for_index == 'Y') ? 'O' : 'X';
              tmp.eYn = (tmp.recv_for_index == 'O') ? false : true;
              if(Number(tmp.F15483) == 0) val = tmp.F34790;
              else val = tmp.F15483;
              tmp.hYn = vm.getHolidayType(tmp.F12506, val, tmp.R_BASIC_INDEX_DATE);
              if(tmp.eYn) vm.countNotRecv++ ;
              if(tmp.hYn) vm.countHoliday++ ;
            }else {
              tmp.recv_for_index = 'O';
              tmp.eYn = false;
            }
            tmp.F15001 = util.formatStringNum(tmp.F15001);
            tmp.F34790 = util.formatDate2(tmp.F34790);
            tmp.F34240 = etputil.getCalType(tmp.F34240);
            tmp.REAL_TYPE = etputil.getRealType(tmp.REAL_TYPE);
            tList.push(tmp);
          }
          // 잦은 렌더링 방지
          vm.mList = tList;
        }
      });
    },
    getIndexList: function() {
      let vm = this;

      axios.get(Config.base_url+'/user/indexMonitor/getindexlist', {
        params: {
          gubun1 : vm.sInfo.gubun1,
          gubun2 : vm.sInfo.gubun2,
          gubun3 : vm.sInfo.gubun3,
        }
      }).then(function(response) {
        if(response.data.success == false){
          alert(response.data.message);
        }else {
          // console.log(tList);
          // 잦은 렌더링 방지
          let tList = []; 
          let pList = response.data.results;
          vm.countHoliday = 0;
          vm.countNotRecv = 0;
          for(let i = 0; i < pList.length; i++) {
            let tmp = JSON.parse(JSON.stringify(pList[i]));
            tmp.dStyle = util.getUpAndDownStyle(tmp.F15004);
            tmp.nStyle = util.getUpAndDownStyle(tmp.F15303);
            tmp.iStyle = util.getUpAndDownStyle(tmp.F15319);

            if(vm.sInfo.gubun1 == 'FOR') {
              let val = 0;
              tmp.recv_for_index = (tmp.recv_for_index == 'Y') ? 'O' : 'X';
              tmp.eYn = (tmp.recv_for_index == 'O') ? false : true;
              // console.log(`[${Number(tmp.F15483)}]`);
              if(Number(tmp.F15483) == 0) val = tmp.F34790;
              else val = tmp.F15483;
              tmp.hYn = vm.getHolidayType(tmp.F12506, val, tmp.R_BASIC_INDEX_DATE);
              if(tmp.eYn) vm.countNotRecv++ ;
              if(tmp.hYn) vm.countHoliday++ ;
            }else {
              tmp.recv_for_index = 'O';
              tmp.eYn = false;
            }
            tmp.F15001 = util.formatStringNum(tmp.F15001);
            tmp.F34790 = util.formatDate2(tmp.F34790);
            tmp.F34240 = etputil.getCalType(tmp.F34240);
            tmp.REAL_TYPE = etputil.getRealType(tmp.REAL_TYPE);
            tList.push(tmp);
          }
          // 잦은 렌더링 방지
          vm.mList = tList;
        }
      });
    },
    // 휴장일 구분
    getHolidayType: function(val1, val2, hType) {
      let rtn = false;
      let hDate = Number(hType.substring(2,3));
      let diffDate = dateutil.diffDate(val1, val2);
      // console.log(`val1 : ${val1} val2 : ${val2} hDate : ${hDate}`);
      // console.log("diffDate1 : " + diffDate);

      // 5일이상 차이가 나면 1주가 바뀐 것임. 토/일 minus
      if(diffDate > 4) {
        diffDate -= 2;
      }else {
        let day1 = dateutil.getDay(val1);
        let day2 = dateutil.getDay(val2);

        // console.log("day1 : " + day1);
        // console.log("day2 : " + day2);
        // 요일이 역전되면 1주가 바뀐 것임. 토/일 minus
        if(day2 > day1) diffDate -= 2;
      }

      if(diffDate > hDate) rtn = true;
      // console.log("diffDate2 : " + diffDate);

      return rtn ;
    },
  }
};
</script>

<style scoped>
tr .textoverflow{
  text-overflow:ellipsis; 
  overflow:hidden; 
  white-space: nowrap;
}
.subtit + button {margin-left:20px;}

.v-btn--small {margin: 0 0px;}
.world-time {padding:8px 0;text-align:center;height:60px;box-sizing:border-box;}
.world-time h6 {font-weight:500;letter-spacing:-0.02em;font-size:12px;}
.world-time h6 * {vertical-align:middle;}
.world-time h6 .flags {width:21px; height:16px;border:0;}
.world-time h6 span {display:inline-block;background:#b0bec5;padding:0 7px;border:1px solid #b0bec5;border-radius:3px;color:#FFF;font-size:11px;height:16px;line-height:15px;box-sizing:border-box;outline:0;}
_:-ms-fullscreen, :root .world-time h6 span {line-height:12px;}
.world-time h6 em {font-style:normal;font-size:14px;color:#1a2132;}
.world-time h6 em.today {color:#1e99e8;}
.world-time p {margin:0;padding:0;color:#9797ac;font-size:20px;}
.world-time p strong {color:#455a64;font-weight:normal;}
.world-time .top1 {text-align:left; padding:0 30px;}
.world-time .down1 {text-align:center;}

</style>