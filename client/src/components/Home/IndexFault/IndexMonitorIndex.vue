<template>
<v-card flat>
  <div class="table-box-wrap">
    <div class="table-box" style="width:1380px;max-height:690px;">
      <table v-if="gubun==='FOR'" class="tbl_type">
        <colgroup>
          <col style="width:400px;">
          <col>
          <col>
          <col>
          <col>
          <col>
          <col>
          <col>
          <col>
          <col style="width:130px;">
        </colgroup>
        <thead>
          <tr>
            <th class="txt_center" style="width:400px;">기초지수명</th>
            <th class="txt_center">입수</th>
            <th class="txt_right">현재가</th>
            <th class="txt_right">대비</th>
            <th class="txt_right">등락률</th>
            <th class="txt_center">기준일</th>
            <th class="txt_center">휴일기준</th>
            <th class="txt_center">전일기준</th>
            <th class="txt_center">실시간</th>
            <th class="txt_center" style="width:147px">기초지수코드</th>
          </tr>
        </thead>
        <tbody>
          <tr :class="[{holiday:item.hYn}, {errorday:item.eYn}]" v-for="(item, index) in mList" :key="index">
            <td class="txt_left">{{item.NAME_K}}</td>
            <td>{{item.recv_for_index}}</td>
            <td class="txt_right" :style="item.iStyle">{{item.F15318}}</td>
            <td class="txt_right" :style="item.iStyle">{{item.F15319}}</td>
            <td class="txt_right" :style="item.iStyle">{{item.F30823}}</td>
            <td>{{item.F34790}}</td>
            <td>{{item.R_NATION_CODE}}</td>
            <td>{{item.R_BASIC_INDEX_DATE}}</td>
            <td>{{item.REAL_TYPE}}</td>
            <td>{{item.SYM_CODE}}</td>
          </tr>
        </tbody>
      </table>
      <table v-else class="tbl_type">
        <colgroup>
          <col style="width:400px;">
          <col style="width:80px;">
          <col style="width:200px;">
          <col style="width:200px;">
          <col style="width:170px;">
          <col style="width:170px;">
          <col style="width:143px;">
        </colgroup>        
        <thead>
          <tr>
            <th class="txt_center" style="width:400px;">기초지수명</th>
            <th class="txt_center" style="width:80px;">입수</th>
            <th class="txt_right" style="width:200px;">현재가</th>
            <th class="txt_right" style="width:200px;">대비</th>
            <th class="txt_right" style="width:170px;">등락률</th>
            <th class="txt_center" style="width:170px;">기준일</th>
            <th class="txt_center" style="width:160px;">기초지수코드</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in mList" :key="index">
            <td class="txt_left">{{item.NAME_K}}</td>
            <td>{{item.recv_for_index}}</td>
            <td class="txt_right" :style="item.iStyle">{{item.F15318}}</td>
            <td class="txt_right" :style="item.iStyle">{{item.F15319}}</td>
            <td class="txt_right" :style="item.iStyle">{{item.F30823}}</td>
            <td>{{item.F34790}}</td>
            <td>{{item.SYM_CODE}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</v-card>
</template>

<script>
import Config       from "@/js/config.js"

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