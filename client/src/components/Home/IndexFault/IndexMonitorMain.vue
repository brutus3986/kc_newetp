<template>
  <v-container>
    <v-layout row wrap class="content_margin">
      <v-flex grow class="conWidth_left">
        <v-card flat>
        <div class="title01_w case2">
          <v-card-title primary-title>
            <div class="title_wrap01">
              <h3 class="headline subtit">기초지수 모니터링</h3>
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
    </v-layout>
    </v-container>
</template>

<script>
import Config       from "@/js/config.js"
import util from "@/js/common/tool/util.js"
import indexMonitorJong from "./indexMonitorJong.vue"
import indexMonitorIndex from "./indexMonitorIndex.vue"

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
    }
  },
  components: {
    indexMonitorJong,
    indexMonitorIndex,
  },
  created() {
    var vm = this;
  },
  mounted: function() {
    this.getEtpList();
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
          let tList = response.data.results;
          // console.log(tList);
          /*
          for(let i=0; i < tList.length; i++) {
            tList[i].trade_date = util.formatDate1(tList[i].trade_date);
          }
          */
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
          let tList = response.data.results;
          // console.log(tList);
          /*
          for(let i=0; i < tList.length; i++) {
            tList[i].trade_date = util.formatDate1(tList[i].trade_date);
          }
          */
          vm.mList = tList;
        }
      });
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
</style>