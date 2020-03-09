<template>
<v-card flat>
  <div class="table-box-wrap">
    <div style="max-height:690px;overflow:auto;">
      <table v-if="gubun==='FOR'" class="tbl_type ver7 sort" style="width:2170px;">
        <colgroup>
          <col style="width:300px;">
          <col style="width:90px;">
          <col style="width:120px;">
          <col style="width:120px;">
          <col style="width:90px;">
          <col style="width:300px;">
          <col style="width:100px;">
          <col style="width:120px;">
          <col style="width:100px;">
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
            <th class="txt_center" style="width:300px;">종목명</th>
            <th class="txt_center" style="width:90px;">단축코드</th>
            <th class="txt_right" style="width:120px;">현재가</th>
            <th class="txt_right" style="width:120px;">iNav</th>
            <th class="txt_right" style="width:90px;">대비</th>
            <th class="txt_center sorting" style="width:280px;" @click="sortTable(3)">기초지수명</th>
            <th class="txt_center sorting" style="width:100px;" @click="sortTable(4)">입수</th>
            <th class="txt_right" style="width:120px;">현재가</th>
            <th class="txt_right" style="width:100px;">대비</th>
            <th class="txt_right sorting" style="width:80px;" @click="sortTable(1)">등락률</th>
            <th class="txt_center sorting" style="width:80px;" @click="sortTable(2)">기준일</th>
            <th class="txt_center" style="width:150px;">기초지수코드(티커)</th>
            <th class="txt_center" style="width:80px;">휴일기준</th>
            <th class="txt_center" style="width:80px;">전일기준</th>
            <th class="txt_center sorting" style="width:80px;" @click="sortTable(5)">산출유형</th>
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
            <td><span>{{item.recv_for_index == 'O' ? '입수완료':'미입수'}}</span></td>
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
      <table v-else class="tbl_type ver7 sort" style="table-layout:fixed;">
        <colgroup>
          <col style="width:280px;">
          <col style="width:80px;">
          <col style="width:100px;">
          <col style="width:110px;">
          <col style="width:90px;">
          <col style="width:280px;">
          <col style="width:80px;">
          <col style="width:120px;">
          <col style="width:100px;">
          <col style="width:70px;">
          <col style="width:70px;">
        </colgroup>         
        <thead>
          <tr>
            <th class="txt_center" style="width:280px;">종목명</th>
            <th class="txt_center" style="width:80px;">단축코드</th>
            <th class="txt_right" style="width:100px;">현재가</th>
            <th class="txt_right" style="width:110px;">iNav</th>
            <th class="txt_right" style="width:90px;">대비</th>
            <th class="txt_center sorting" style="width:280px;" @click="sortTable(3)">기초지수명</th>
            <th class="txt_center sorting" style="width:80px;" @click="sortTable(4)">입수</th>
            <th class="txt_right" style="width:120px;">현재가</th>
            <th class="txt_right" style="width:100px;">대비</th>
            <th class="txt_right sorting" style="width:70px;" @click="sortTable(1)">등락률</th>
            <th class="txt_center sorting" style="width:70px;" @click="sortTable(2)">기준일</th>
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
            <td><span>{{item.recv_for_index == 'O' ? '입수완료':'미입수'}}</span></td>
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
      sortFlag1: 1,
      sortFlag2: 1,
      sortFlag3: 1,
      sortFlag4: 1,
      sortFlag5: 1,
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
    sortTable: function(gubun) {
      console.log("sortTable.......... : " + gubun);
      let vm = this;
      if(gubun == 1) {
        vm.sortFlag1 = vm.sortFlag1 * (-1);
        vm.mList.sort(function(a, b) {
          if(Number(a.F30823) > Number(b.F30823)) return vm.sortFlag1;
          else return (vm.sortFlag1 * (-1));
        });
      }else if(gubun == 2) {
        vm.sortFlag2 = vm.sortFlag2 * (-1);
        vm.mList.sort(function(a, b) {
          if(a.F34790 > b.F34790) return vm.sortFlag2;
          else return (vm.sortFlag2 * (-1));
        });
      }else if(gubun == 3) {
        vm.sortFlag3 = vm.sortFlag3 * (-1);
        vm.mList.sort(function(a, b) {
          if(a.NAME_K > b.NAME_K) return vm.sortFlag3;
          else return (vm.sortFlag3 * (-1));
        });
      }else if(gubun == 4) {
        vm.sortFlag4 = vm.sortFlag4 * (-1);
        vm.mList.sort(function(a, b) {
          if(a.recv_for_index > b.recv_for_index) return vm.sortFlag4;
          else return (vm.sortFlag4 * (-1));
        });
      }else if(gubun == 5) {
        vm.sortFlag5 = vm.sortFlag5 * (-1);
        vm.mList.sort(function(a, b) {
          if(a.REAL_TYPE > b.REAL_TYPE) return vm.sortFlag5;
          else return (vm.sortFlag5 * (-1));
        });
      }
    }
  }
};
</script>

<style scoped>
.table-box-wrap {padding-top:0;}
tr .textoverflow{
  text-overflow:ellipsis; 
  overflow:hidden; 
  white-space: nowrap;
}

.holiday{
  background-color: #e3f3ff;
}
.errorday{
  background-color: #ffe5d7;
}

</style>