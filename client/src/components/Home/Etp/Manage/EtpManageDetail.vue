<template>
  <div>
    <v-layout row wrap class="con_wrap">
      <v-flex grow class="conWidth_left">
        <v-card flat>
          <!-- content내용 -->
          <div class="title01_w">
            <v-card-title primary-title>
              <div class="title_wrap01">
                <h3 class="headline mb-0">
                  {{this.etpBasic.F16002}}
                  <span class="grey--text">{{etpBasic.F16013}}</span>
                </h3>
                <div class="right_btn">
                  <v-layout align-right>
                    <v-flex xs12 sm4 text-xs-center>
                      <div class="btn_r">
                        <v-btn outline color="primary" small @click="fn_goBack()">목록으로 돌아가기</v-btn>
                      </div>
                    </v-flex>
                  </v-layout>
                </div>
              </div>
            </v-card-title>
          </div>
          <div class="graph_01_w">
            <div class="sub_title_num">
              {{etpBasic.F15001}}
              <span
                v-if="etpBasic.F15472 <= 0"
                class="text_blue"
              >{{etpBasic.F15472}}({{etpBasic.F15004}})%</span>
              <span v-else class="text_red">{{etpBasic.F15472}}({{etpBasic.F15004}})%</span>
              <p>Last Updated : {{etpBasic.fmt_F12506}}</p>
            </div>
            <div class="index_nums">
              <v-layout>
                <v-flex>
                  <ul>
                    <li>iNAV</li>
                    <li class="number">{{formatNumber(etpBasic.F15301)}}</li>
                    <li
                      v-if="etpBasic.F30818 <= 0"
                      class="number2 text_blue"
                    >{{formatNumber(etpBasic.F30818)}}%</li>
                    <li v-else class="number2 text_red">{{formatNumber(etpBasic.F30818)}}%</li>
                  </ul>
                </v-flex>
                <v-flex>
                  <ul>
                    <li>기초지수</li>
                    <li class="number">{{formatNumber(etpBasic.F15318)}}</li>
                    <li
                      v-if="etpBasic.F30823 <= 0"
                      class="number2 text_blue"
                    >{{formatNumber(etpBasic.F30823)}}%</li>
                    <li v-else class="number2 text_red">{{formatNumber(etpBasic.F30823)}}%</li>
                  </ul>
                </v-flex>
                <v-flex class="ver1">
                  <ul>
                    <li>시가총액</li>
                    <li class="number">{{formatNumber(etpBasic.F15028 / 1000000000)}}십억</li>
                    <li></li>
                  </ul>
                </v-flex>
                <v-flex class="ver2">
                  <ul>
                    <li>거래량</li>
                    <li class="number">{{formatInt(etpBasic.F15015)}}주</li>
                    <li class="number2 text_green">AVG(3M):{{formatInt(etpBasic.F13510)}}</li>
                  </ul>
                </v-flex>
                <v-flex class="ver3">
                  <ul>
                    <li>거래대금</li>
                    <li class="number">{{formatNumber(etpBasic.F15023/10000000)}}억</li>
                    <li
                      class="number2 text_green"
                    >AVG(3M):{{formatNumber(etpBasic.F13516/10000000)}}억</li>
                  </ul>
                </v-flex>
              </v-layout>
            </div>
          </div>
          <LineEtpMultiChart :etpBasic="etpBasic"></LineEtpMultiChart>
          <div class="tab2_w">
            <v-layout row wrap>
              <v-flex xs12>
                <v-tabs fixed-tabs light v-model="tab5" align-with-title>
                  <v-tabs-slider color="#1976d2"></v-tabs-slider>
                  <v-tab v-for="item in items5" :key="item">{{ item }}</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab5">
                  <v-tab-item>
                    <EtpManageDetailAnalysisTab
                      v-if="showEtpManageDetailDialogBySub"
                      :etpBasic="etpBasic"
                    ></EtpManageDetailAnalysisTab>
                  </v-tab-item>
                  <v-tab-item>
                    <EtpManageDetailBasicInfoTab
                      v-if="showEtpManageDetailDialogBySub"
                      :etpBasic="etpBasic"
                      :indexBasic="indexBasic"
                      @showIndexDetail="showIndexDetail"
                    ></EtpManageDetailBasicInfoTab>
                  </v-tab-item>
                </v-tabs-items>
              </v-flex>
            </v-layout>
          </div>
        </v-card>
      </v-flex>
      <v-flex class="conWidth_right">
        <ComEtpFavorItemSub :faverSize="faverSize" @showDetail="showDetail"></ComEtpFavorItemSub>
      </v-flex>
    </v-layout>
    <!-- 지수 상세 팝업 -->
    <v-dialog v-model="showIndexDetailDialog" persistent max-width="1400">
      <IndexDetailInfo
        v-if="showIndexDetailDialog"
        :paramData="indexBasic"
        :showDialog="showIndexDetailDialog"
        :showView="false"
        @fn_closePop="fn_close"
      ></IndexDetailInfo>
    </v-dialog>
  </div>
</template>

<script>
  import Config from "@/js/config.js";
  import util from "@/js/common/tool/util.js"
  import EtpManageDetailBasicInfoTab from "./EtpManageDetailBasicInfoTab.vue";
  import EtpManageDetailAnalysisTab from "./EtpManageDetailAnalysisTab.vue";
  import LineEtpMultiChart from '@/components/common/chart/LineEtpMultiChart.vue';
  import IndexDetailInfo from "@/components/Home/Index/Manage/IndexDetailInfo.vue"; /*지수 상세정보*/
  import ComEtpFavorItemSub from "@/components/common/control/ComEtpFavorItemSub";
  export default {
    props: ["paramData"],
    data() {
      return {
        tab5: null,
        items5: ["분석정보", "기본정보"],
        toggle_one: '1M',
        etpBasic: {},
        indexBasic: {},
        etpInfos: {},
        showEtpManageDetailDialogBySub: false,
        showIndexDetailDialog: false,
        faverSize: 985,
      };
    },
    components: {
      IndexDetailInfo,
      LineEtpMultiChart,
      EtpManageDetailBasicInfoTab,
      EtpManageDetailAnalysisTab,
      ComEtpFavorItemSub,
    },
    mounted: function() {
      console.log( "EtpManageDetail.vue -> mounted" );
      console.log( this.paramData );
      this.fn_getEtpBasic(this.paramData);
    },
    created: function() {
      // console.log("EtpManageDetail...........created..........");
      var vm = this;
      vm.$EventBus.$on('changeEtpInfo', data => {
        console.log("changeEtpInfo..........");
        vm.toggle_one = '1M';
        vm.fn_getEtpBasic(data);
      });
    },
    destroyed: function() {
      // console.log("EtpManageDetail...........destoryed..........");
      this.$EventBus.$off('changeEtpInfo');
    },
    methods: {
      fn_getEtpBasic: function(param) {
        // console.log("fn_getEtpBasic..................");
        var vm = this;
        axios.post(Config.base_url + "/user/etp/getEtpBasic", {
          data: param
        }).then(function(response) {
          console.log(response);
          if(response.data) {
            var msg = (response.data.msg ? response.data.msg : "");
            if(!response.data.result) {
              if(msg) {
                vm.$root.confirmt.open('확인', msg, {}, 1);
                return false;
              }
            }
            vm.etpBasic = response.data.etpBasic;
            vm.etpBasic.F15001 = util.formatStringNum(vm.etpBasic.F15001);
            vm.indexBasic = response.data.indexBasic;
            vm.indexBasic.F16257 = vm.etpBasic.F16257;
            vm.indexBasic.LARGE_TYPE = vm.indexBasic.large_type;
            vm.indexBasic.MARKET_ID = vm.indexBasic.market_id;
            vm.showEtpManageDetailDialogBySub = true;
          }
        });
      },
      fn_goBack() {
        // this.$router.go(-1);
        // console.log("fn_goBack......");
        this.$emit('fn_pageMove', null, null);

      },
      fn_close: function() {
        var vm = this;
        vm.showIndexDetailDialog = false;
      },
      formatNumber: function(num) {
        return util.formatNumber(num);
      },
      formatInt: function(num) {
        return util.formatInt(num);
      },
      showDetail: function(gubun, param) {
        this.fn_getEtpBasic(param);
      },
      showIndexDetail: function() {
        var vm = this;
        vm.showIndexDetailDialog = true;
      }
    }
  };
</script>