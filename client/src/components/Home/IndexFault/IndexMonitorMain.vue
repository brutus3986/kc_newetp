<template>
  <v-container>
    <v-layout row wrap class="content_margin">
      <div>
      <v-flex xs12>
        <indexMonitorBox></indexMonitorBox>
      </v-flex>
      <v-flex grow xs12>
        <v-card flat>
        <div class="title01_w case2">
          <v-card-title primary-title>
            <div class="title_wrap01">
              <h3 class="headline subtit">기초지수 모니터링</h3>
              <v-btn style="background:gray;color:#FFF;" small>전체 : {{mList.length}}</v-btn>
              <v-btn style="background:#90CAF9;color:#FFF;" small>휴장 : {{cntHoliday}}</v-btn>
              <v-btn style="background:#FB8C00;color:#FFF;" small>미입수 : {{cntNotRecv}}</v-btn>
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
        <indexMonitorIndex v-if="viewGubun == 'INDEX'" :mList="mList" :gubun="sInfo.gubun1" @countHoliday="countHoliday"></indexMonitorIndex>
        <indexMonitorJong v-if="viewGubun == 'JONG'" :mList="mList" :gubun="sInfo.gubun1" @countHoliday="countHoliday"></indexMonitorJong>
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
import indexMonitorBox from "./IndexMonitorBox.vue"
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
      cntHoliday : 0,
      cntNotRecv : 0,
    }
  },
  components: {
    indexMonitorBox,
    indexMonitorJong,
    indexMonitorIndex,
  },
  mounted: function() {
    this.getIndexList();
  },
  methods: {
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
          vm.cntHoliday = 0;
          vm.cntNotRecv = 0;
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
              if(tmp.eYn) vm.cntNotRecv++ ;
              if(tmp.hYn) vm.cntHoliday++ ;
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
          vm.cntHoliday = 0;
          vm.cntNotRecv = 0;
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
              // 당일 기초지수 일자 필요없슴. 무조건 기준일로 처리
              // if(Number(tmp.F15483) == 0) val = tmp.F34790;
              // else val = tmp.F15483;
              val = tmp.F34790;
              tmp.hYn = vm.getHolidayType(tmp.F12506, val, tmp.R_BASIC_INDEX_DATE);
              if(tmp.eYn) vm.cntNotRecv++ ;
              if(tmp.hYn) vm.cntHoliday++ ;
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

    countHoliday: function(cnt) {
      // console.log("countHoliday.....");
      this.cntHoliday += cnt;
    }
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
</style>