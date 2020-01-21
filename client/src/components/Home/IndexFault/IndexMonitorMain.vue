<template>
  <div>
    <v-container>
      <v-layout row wrap class="content_margin">
        <v-flex grow class="conWidth_left">
          <v-card flat>
            <v-card-title primary-title>
              <div class="title_wrap01">
                <h3 class="headline subtit">기초지수 모니터링</h3>
                <div class="right_btn">
                  <span class="toggle2">
                    <v-btn-toggle v-model="stateInfo.gubun1" class="toggle_01">
                      <v-btn flat value="0">해외</v-btn>
                      <v-btn flat value="1">국내</v-btn>
                    </v-btn-toggle>
                  </span>
                  <span class="toggle2">
                    <v-btn-toggle v-model="stateInfo.gubun2" class="toggle_01">
                      <v-btn flat value=
                      "ETF">ETF</v-btn>
                      <v-btn flat value="ETN">ETN</v-btn>
                    </v-btn-toggle>
                  </span>
                  <span class="toggle2">
                    <v-btn-toggle v-model="stateInfo.gubun3" class="toggle_01">
                      <v-btn flat value="0">종목별</v-btn>
                      <v-btn flat value="1">지수별</v-btn>
                    </v-btn-toggle>
                  </span>
                  <span class="toggle2">
                    <v-btn-toggle v-model="stateInfo.gubun4" class="toggle_01">
                      <v-btn flat value="0">전체</v-btn>
                      <v-btn flat value="1">실시간</v-btn>
                      <v-btn flat value="2">종가</v-btn>
                    </v-btn-toggle>
                  </span>
                </div>
              </div>
            </v-card-title>
            <div class="table-box-wrap">
              <div class="table-box" style="max-height:1000px;">
                <table class="tbl_type ver8">
                  <caption>헤더 고정 테이블</caption>
                  <colgroup>
                    <col width="21%" />
                    <col width="9%" />
                    <col width="7%" />
                    <col width="7%" />
                    <col width="7%" />
                    <col width="7%" />
                    <col width="7%" />
                    <col width="7%" />
                    <col width="7%" />
                    <col width="7%" />
                    <col width="7%" />
                    <col width="7%" />
                  </colgroup>
                  <thead>
                    <tr>
                      <th style="width:21%" class="txt_center">지수명</th>
                      <th style="width:9%" class="txt_center">현재가</th>
                      <th style="width:7%" class="txt_center">대비</th>
                      <th style="width:7%" class="txt_center">Daily</th>
                      <th style="width:7%" class="txt_center">1Week</th>
                      <th style="width:7%" class="txt_center">1Month</th>
                      <th style="width:7%" class="txt_center">YTD</th>
                      <th style="width:7%" class="txt_center">1Year</th>
                      <th style="width:7%" class="txt_center">3Year</th>
                      <th style="width:7%" class="txt_center">5Year</th>
                      <th style="width:7%" class="txt_center">10Year</th>
                      <th style="width:7%" class="txt_center">지수정보</th>
                    </tr>
                  </thead>
                  <tbody>
                  <!--
                    <tr v-for="(item, index) in indexLists" :key="index">
                      <td class="txt_left">
                        <span style="font-weight:bold;">{{item.F16002}}</span>
                      </td>
                      <td class="txt_right">{{item.F15001}}</td>
                      <td class="txt_right" :style="item.dStyle">{{item.F15472}}</td>
                      <td class="txt_right" :style="item.dStyle">{{item.F15004}}%</td>
                      <td class="txt_right" :style="item.wStyle">{{item.weekRate}}%</td>
                      <td class="txt_right" :style="item.mStyle">{{item.monthRate}}%</td>
                      <td class="txt_right" :style="item.ytdStyle">{{item.ytdRate}}%</td>
                      <td class="txt_right" :style="item.yStyle">{{item.yearRate}}%</td>
                      <td class="txt_right" :style="item.y3Style">{{item.year3Rate}}%</td>
                      <td class="txt_right" :style="item.y5Style">{{item.year5Rate}}%</td>
                      <td class="txt_right" :style="item.y10Style">{{item.year10Rate}}%</td>
                      <td class="txt_center">
                        <div class="tooltip">
                          <button
                            class="btn_icon v-icon material-icons"
                            @click="openIndexModal(item)"
                          >equalizer</button>
                          <span class="tooltiptext" style="width:80px;">지수정보</span>
                        </div>
                      </td>
                    </tr>
                    -->
                  </tbody>
                </table>
              </div>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Config       from "@/js/config.js"
import Util       from "@/js/util.js"
import IndexFaultModal from "./IndexFaultModal.vue"

export default {
  data() {
    return {
      mList: [],
      mapItem: {},
      page: 1,
      perPage: 10,
      totcnt: 0,
      totPage: 1,
      agency_cd: '0',
      agencyList: [],
      stateInfo : {
        gubun1 : '0',
        gubun2 : 'ETF',
        gubun3 : '0',
        gubun4 : '0',
      },
      ModalFlag: false,
    }
  },
  components: {
    IndexFaultModal,
  },
  created() {
    var vm = this;
  },
  mounted: function() {
  },
  methods: {
  },
};
</script>

<style scoped>
.textcount {
  margin-left: 50px;
  color: #FF0000;
}
</style>