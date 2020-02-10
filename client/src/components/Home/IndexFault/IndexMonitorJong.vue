<template>
<v-card flat>
  <div class="table-box-wrap">
    <div style="max-height:690px;overflow:auto;">
      <table v-if="gubun==='FOR'" class="tbl_type" style="width:2090px;">
        <colgroup>
          <col style="width:300px;">
          <col style="width:80px;">
          <col style="width:120px;">
          <col style="width:120px;">
          <col style="width:80px;">
          <col style="width:300px;">
          <col style="width:80px;">
          <col style="width:120px;">
          <col style="width:80px;">
          <col style="width:80px;">
          <col style="width:80px;">
          <col style="width:150px;">
          <col style="width:80px;">
          <col style="width:80px;">
          <col style="width:80px;">
          <col style="width:120px;">
          <col style="width:80px;">
          <col style="width:80px;">
        </colgroup>        
        <thead>
          <tr>
            <th class="txt_center" style="width:280px;">종목명</th>
            <th class="txt_center" style="width:80px;">단축코드</th>
            <th class="txt_right" style="width:120px;">현재가</th>
            <th class="txt_right" style="width:120px;">iNav</th>
            <th class="txt_right" style="width:80px;">대비</th>
            <th class="txt_center" style="width:280px;">기초지수명</th>
            <th class="txt_center" style="width:80px;">입수</th>
            <th class="txt_right" style="width:120px;">현재가</th>
            <th class="txt_right" style="width:80px;">대비</th>
            <th class="txt_right" style="width:80px;">등락률</th>
            <th class="txt_center" style="width:80px;">기준일</th>
            <th class="txt_center" style="width:150px;">기초지수코드(티커)</th>
            <th class="txt_center" style="width:80px;">휴일기준</th>
            <th class="txt_center" style="width:80px;">전일기준</th>
            <th class="txt_center" style="width:80px;">실시간</th>
            <th class="txt_center" style="width:120px;">헷지여부</th>
            <th class="txt_center" style="width:80px;">통화</th>
            <th class="txt_center" style="width:80px;">배율</th>
          </tr>
        </thead>
        <tbody>
          <tr :class="[{holiday:item.hYn}, {errorday:item.eYn}]" v-for="(item, index) in mList" :key="index">
            <td class="txt_left">{{item.F16002}}</td>
            <td>{{item.F16013}}</td>
            <td class="txt_right" :style="item.dStyle">{{item.F15001}}</td>
            <td class="txt_right" :style="item.nStyle">{{item.F15301}}</td>
            <td class="txt_right" :style="item.nStyle">{{item.F15303}}</td>
            <td class="txt_left">{{item.F34777}}</td>
            <td>{{item.recv_for_index}}</td>
            <td class="txt_right" :style="item.iStyle">{{item.F15318}}</td>
            <td class="txt_right" :style="item.iStyle">{{item.F15319}}</td>
            <td class="txt_right" :style="item.iStyle">{{item.F30823}}</td>
            <td>{{item.F34790}}</td>
            <td class="txt_left">{{item.BBG_TICKER}}</td>
            <td>{{item.R_NATION_CODE}}</td>
            <td>{{item.R_BASIC_INDEX_DATE}}</td>
            <td>{{item.REAL_TYPE}}</td>
            <td>{{item.F34240}}</td>
            <td>{{item.F18450}}</td>
            <td>{{item.F18453}}</td>
          </tr>
        </tbody>
      </table>
      <table v-else class="tbl_type" style="table-layout:fixed;">
        <colgroup>
          <col style="width:290px;">
          <col style="width:80px;">
          <col style="width:100px;">
          <col style="width:110px;">
          <col style="width:90px;">
          <col style="width:290px;">
          <col style="width:60px;">
          <col style="width:120px;">
          <col style="width:100px;">
          <col style="width:70px;">
          <col style="width:70px;">
        </colgroup>         
        <thead>
          <tr>
            <th class="txt_center" style="width:290px;">종목명</th>
            <th class="txt_center" style="width:80px;">단축코드</th>
            <th class="txt_right" style="width:100px;">현재가</th>
            <th class="txt_right" style="width:110px;">iNav</th>
            <th class="txt_right" style="width:90px;">대비</th>
            <th class="txt_center" style="width:290px;">기초지수명</th>
            <th class="txt_center" style="width:60px;">입수</th>
            <th class="txt_right" style="width:120px;">현재가</th>
            <th class="txt_right" style="width:100px;">대비</th>
            <th class="txt_right" style="width:70px;">등락률</th>
            <th class="txt_center" style="width:70px;">기준일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in mList" :key="index">
            <td class="txt_left">{{item.F16002}}</td>
            <td>{{item.F16013}}</td>
            <td class="txt_right" :style="item.dStyle">{{item.F15001}}</td>
            <td class="txt_right" :style="item.nStyle">{{item.F15301}}</td>
            <td class="txt_right" :style="item.nStyle">{{item.F15303}}</td>
            <td class="txt_left">{{item.F34777}}</td>
            <td>{{item.recv_for_index}}</td>
            <td class="txt_right" :style="item.iStyle">{{item.F15318}}</td>
            <td class="txt_right" :style="item.iStyle">{{item.F15319}}</td>
            <td class="txt_right" :style="item.iStyle">{{item.F30823}}</td>
            <td>{{item.F34790}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</v-card>
</template>

<script>
import Config       from "@/js/config.js"
import util from "@/js/common/tool/util.js"
import _ from "lodash"

export default {
  props: ['mList','gubun'],
  data() {
    return {
    }
  },
  components: {
  },
  created() {
    var vm = this;
  },
  mounted: function() {
  },
  methods: {
  }
};
</script>

<style scoped>
tr .textoverflow{
  text-overflow:ellipsis; 
  overflow:hidden; 
  white-space: nowrap;
}

.holiday{
  background-color: #90CAF9;
}
.errorday{
  background-color: #FB8C00;
}

</style>