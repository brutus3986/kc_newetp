<template>
<v-card flat>
  <div class="table-box-wrap">
    <div class="table-box" style="width:1380px;max-height:690px;">
      <table v-if="gubun==='FOR'" class="tbl_type ver7 sort">
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
            <th class="txt_center sorting" style="width:400px;" @click="sortTable(3)">기초지수명</th>
            <th class="txt_center sorting" @click="sortTable(4)">입수</th>
            <th class="txt_right">현재가</th>
            <th class="txt_right">대비</th>
            <th class="txt_right sorting" @click="sortTable(1)">등락률</th>
            <th class="txt_center sorting" @click="sortTable(2)">기준일</th>
            <th class="txt_center">휴일기준</th>
            <th class="txt_center">전일기준</th>
            <th class="txt_center sorting" @click="sortTable(5)">산출유형</th>
            <th class="txt_center" style="width:147px">기초지수코드</th>
          </tr>
        </thead>
        <tbody>
          <tr :class="[{holiday:item.hYn}, {errorday:item.eYn}]" v-for="(item, index) in mList" :key="index">
            <td class="txt_left">{{item.NAME_K}}</td>
            <td><span>{{item.recv_for_index == 'O' ? '입수완료':'미입수'}}</span></td>
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
      <table v-else class="tbl_type ver7 sort">
        <colgroup>
          <col style="width:420px;">
          <col style="width:100px;">
          <col style="width:180px;">
          <col style="width:180px;">
          <col style="width:170px;">
          <col style="width:170px;">
          <col style="width:143px;">
        </colgroup>        
        <thead>
          <tr>
            <th class="txt_center sorting" style="width:420px;" @click="sortTable(3)">기초지수명</th>
            <th class="txt_center sorting" style="width:100px;" @click="sortTable(4)">입수</th>
            <th class="txt_right" style="width:180px;">현재가</th>
            <th class="txt_right" style="width:180px;">대비</th>
            <th class="txt_right sorting" style="width:170px;" @click="sortTable(1)">등락률</th>
            <th class="txt_center sorting" style="width:170px;" @click="sortTable(2)">기준일</th>
            <th class="txt_center" style="width:160px;">기초지수코드</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in mList" :key="index">
            <td class="txt_left">{{item.NAME_K}}</td>
            <td><span>{{item.recv_for_index == 'O' ? '입수완료':'미입수'}}</span></td>
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
      sortFlag1: 1,
      sortFlag2: 1,
      sortFlag3: 1,
      sortFlag4: 1,
      sortFlag5: 1,
      holState: {},
      cntHoliday: 0,
    }
  },
  computed: {
  },
  watch: {
    mList: function(m) {
      // console.log("IndexMonitorIndex.....watch length : " + m.length);
      // console.log(m);
      // 아시아 당일 휴장일 처리
      // 아시아 지수는 기준일이 아닌, 휴장일 테이블로 처리함
      for(let i=0; i < m.length; i++) {
        if(m[i].R_NATION_CODE == 'KR') {
          if(this.holState.KR_HOLIDAY == 2) {
            // console.log("JP_HOLIDAY : " + this.holState.JP_HOLIDAY);
            m[i].hYn = true;
            this.cntHoliday++;
          }
        }else if(m[i].R_NATION_CODE == 'JP') {
          if(this.holState.JP_HOLIDAY == 2) {
            // console.log("JP_HOLIDAY : " + this.holState.JP_HOLIDAY);
            m[i].hYn = true;
            this.cntHoliday++;
          }
        }else if(m[i].R_NATION_CODE == 'SG') {
          if(this.holState.SG_HOLIDAY == 2) {
            // console.log("JP_HOLIDAY : " + this.holState.JP_HOLIDAY);
            m[i].hYn = true;
            this.cntHoliday++;
          }
        }else if(m[i].R_NATION_CODE == 'HK') {
          if(this.holState.HK_HOLIDAY == 2) {
            // console.log("JP_HOLIDAY : " + this.holState.JP_HOLIDAY);
            m[i].hYn = true;
            this.cntHoliday++;
          }
        }else if(m[i].R_NATION_CODE == 'PH') {
          if(this.holState.PH_HOLIDAY == 2) {
            // console.log("JP_HOLIDAY : " + this.holState.JP_HOLIDAY);
            m[i].hYn = true;
            this.cntHoliday++;
          }
        }else if(m[i].R_NATION_CODE == 'SZ' || m[i].R_NATION_CODE == 'SH') {
          if(this.holState.SZ_HOLIDAY == 2) {
            // console.log("JP_HOLIDAY : " + this.holState.JP_HOLIDAY);
            m[i].hYn = true;
            this.cntHoliday++;
          }
        } 
      }
      // console.log("Call countHoliday..........");
      this.$emit("countHoliday", this.cntHoliday);
    },
  },
  components: {
  },
  created() {
    var vm = this;
  },
  mounted: function() {
    this.getWorldHolidayToday();
  },
  methods: {
    getWorldHolidayToday() {
      let vm = this;

      axios.get(Config.base_url+'/user/indexMonitor/getHolidayAll', {
        params: {
        }
      }).then(function(response) {
        if(response.data.success == false){
          // alert(response.data.message);
        }else {
          vm.holState = response.data.results[0];
          // console.log(vm.holState.JP_HOLIDAY);
        }
      });
    },
    sortTable: function(gubun) {
      console.log("sortTable.......... : " + gubun);
      let vm = this;
      if(gubun == 1) {
        vm.sortFlag1 = vm.sortFlag1 * (-1);
        vm.mList.sort(function(a, b) {
          // 문자열 --> 숫자 수정
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