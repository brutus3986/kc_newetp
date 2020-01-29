<template>
<v-card flat>
  <div class="table-box-wrap">
    <div class="table-box" style="min-height:690px;">
      <table v-if="gubun==='FOR'" class="tbl_type" style="table-layout:fixed;">
        <thead>
          <tr>
            <th class="txt_center">종목명</th>
            <th class="txt_center">단축코드</th>
            <th class="txt_center">현재가</th>
            <th class="txt_center">iNav</th>
            <th class="txt_center">대비</th>
            <th class="txt_center">기초지수명</th>
            <th class="txt_center">기초지수코드(티커)</th>
            <th class="txt_center">입수</th>
            <th class="txt_center">현재가</th>
            <th class="txt_center">대비</th>
            <th class="txt_center">등락률</th>
            <th class="txt_center">기준일</th>
            <th class="txt_center">휴일기준</th>
            <th class="txt_center">전일기준</th>
            <th class="txt_center">실시간</th>
            <th class="txt_center">헷지여부</th>
            <th class="txt_center">통화</th>
            <th class="txt_center">배율</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in pList" :key="index">
            <td class="txt_left">{{item.F16002}}</td>
            <td>{{item.F16013}}</td>
            <td class="txt_right" :style="item.dStyle">{{item.F15001}}</td>
            <td class="txt_right" :style="item.nStyle">{{item.F15301}}</td>
            <td class="txt_right" :style="item.nStyle">{{item.F15303}}</td>
            <td class="txt_left">{{item.F34777}}</td>
            <td class="txt_left">{{item.BBG_TICKER}}</td>
            <td>O</td>
            <td class="txt_right" :style="item.iStyle">{{item.F15318}}</td>
            <td class="txt_right" :style="item.iStyle">{{item.F15319}}</td>
            <td class="txt_right" :style="item.iStyle">{{item.F30823}}</td>
            <td>{{item.F34790}}</td>
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
        <thead>
          <tr>
            <th class="txt_center">종목명</th>
            <th class="txt_center">단축코드</th>
            <th class="txt_center">현재가</th>
            <th class="txt_center">iNav</th>
            <th class="txt_center">대비</th>
            <th class="txt_center">기초지수명</th>
            <th class="txt_center">입수</th>
            <th class="txt_center">현재가</th>
            <th class="txt_center">대비</th>
            <th class="txt_center">등락률</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in pList" :key="index">
            <td class="txt_left">{{item.F16002}}</td>
            <td>{{item.F16013}}</td>
            <td class="txt_right" :style="item.dStyle">{{item.F15001}}</td>
            <td class="txt_right" :style="item.nStyle">{{item.F15301}}</td>
            <td class="txt_right" :style="item.nStyle">{{item.F15303}}</td>
            <td class="txt_left">{{item.F34777}}</td>
            <td>O</td>
            <td class="txt_right" :style="item.iStyle">{{item.F15318}}</td>
            <td class="txt_right" :style="item.iStyle">{{item.F15319}}</td>
            <td class="txt_right" :style="item.iStyle">{{item.F30823}}</td>
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
      pList: [],
    }
  },
  components: {
  },
  created() {
    var vm = this;
  },
  mounted: function() {
    // this.tList = _.cloneDeep(this.mList);
    // console.log(this.tList);
    // console.log(this.gubun);
    // 잦은 렌더링 방지
    let tList = []; 
    for(let i = 0; i < this.mList.length; i++) {
      let tmp = JSON.parse(JSON.stringify(this.mList[i]));
      tmp.dStyle = util.getUpAndDownStyle(tmp.F15004);
      tmp.nStyle = util.getUpAndDownStyle(tmp.F15303);
      tmp.iStyle = util.getUpAndDownStyle(tmp.F15319);

      tmp.F15001 = util.formatStringNum(tmp.F15001);
      tList.push(tmp);


    }
    this.pList = tList;
    console.log(this.pList);
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
</style>