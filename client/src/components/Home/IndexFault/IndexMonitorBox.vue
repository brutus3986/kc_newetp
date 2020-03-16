<template>
    <v-layout row wrap>
      <v-flex xs06 v-for="(box, index) in boxList" :key="index">
        <v-card flat class="world-time" :class="box.style">
          <div class="top1">
            <h6>
              <img class="flags" :src="box.imgsrc" :alt="box.alt">
              <span>{{box.region}}</span> 
              <em :class="{today:box.holiday.val}">{{box.Time.ddate}}</em>
              <em class="today" v-if="box.holiday.val">(휴장)</em>
            </h6>
          </div>
          <div class="down1">
            <p>{{box.Time.day}} <strong>{{box.Time.time}}</strong></p>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
import Config       from "@/js/config.js"
import dateutil from "@/js/common/tool/dateutil.js"

export default {
  data() {
    return {
      timeId : null,
      boxList: [{style:"mr-1", region: "한국", imgsrc: "/assets/img/icons/flag-kr.gif", alt: "South Korea Flag",
        holiday: {colName:"KR_HOLIDAY", val: false}, Time: {}, offset: 0},
          {style:"mr-1", region: "뉴욕", imgsrc: "/assets/img/icons/flag-us.gif", alt: "USA Flag",
        holiday: {colName:"US_HOLIDAY", val: false}, Time: {}, offset: -13},
          {style:"mr-1", region: "시카고", imgsrc: "/assets/img/icons/flag-us.gif", alt: "USA Flag",
        holiday: {colName:"US_HOLIDAY", val: false}, Time: {}, offset: -14},
          {style:"mr-1", region: "런던", imgsrc: "/assets/img/icons/flag-uk.gif", alt: "UK Flag",
        holiday: {colName:"UK_HOLIDAY", val: false}, Time: {}, offset: -9},
          {style:"mr-1", region: "유로존", imgsrc: "/assets/img/icons/flag-eu.gif", alt: "EUR Flag",
        holiday: {colName:"EUREX_HOLIDAY", val: false}, Time: {}, offset: -8},
          {style:"mr-0", region: "상해", imgsrc: "/assets/img/icons/flag-cn.gif", alt: "China Flag",
        holiday: {colName:"INJURY_HOLIDAY", val: false}, Time: {}, offset: -1}
      ],
    }
  },
  computed: {
    T0date : function() {
      return this.boxList[0].Time.date;
    },
    T1date : function() {
      return this.boxList[1].Time.date;
    },
    T2date : function() {
      return this.boxList[2].Time.date;
    },
    T3date : function() {
      return this.boxList[3].Time.date;
    },
    T4date : function() {
      return this.boxList[4].Time.date;
    },
    T5date : function() {
      return this.boxList[5].Time.date;
    },
  },
  watch: {
    'T0date': function() {
      console.log("T0date : " + T0date);
      this.getBoxHoliday(T0date, this.boxList[0].holiday);
    },
    'T1date': function() {
      console.log("T1date : " + T1date);
      this.getBoxHoliday(T1date, this.boxList[1].holiday);
    },
    'T2date': function() {
      console.log("T2date : " + T2date);
      this.getBoxHoliday(T2date, this.boxList[2].holiday);
    },
    'T3date': function() {
      console.log("T3date : " + T3date);
      this.getBoxHoliday(T3date, this.boxList[3].holiday);
    },
    'T4date': function() {
      console.log("T4date : " + T4date);
      this.getBoxHoliday(T0date, this.boxList[4].holiday);
    },
    'T5date': function() {
      console.log("T5date : " + T5date);
      this.getBoxHoliday(T5date, this.boxList[5].holiday);
    },
  },
  components: {
  },
  created() {
    this.getBoxTime();    
  },
  destroyed() {
    clearInterval(this.timeId);
  },
  mounted: function() {
    let vm = this;

    this.timeId = setInterval(function() {
      vm.getBoxTime();
    }, 1000);
  },
  methods: {
    getBoxTime: function() {
      for(let i=0; i < 6; i++) {
        dateutil.getTimeOffsetObj(this.boxList[i].offset, this.boxList[i].Time);
        // console.log("getBoxTime... : " + i + " time : " + this.boxList[i].Time.time);
      }
      // v-for 를 쓴 이후로, 자동 rendering 되지 않음.
      this.$forceUpdate();
    },
    getBoxHoliday: function(inDate, holiday) {
      let vm = this;
      // console.log("Call getHoliday...............");
      axios.get(Config.base_url+'/user/indexMonitor/getholiday', {
        params: {
          colname : holiday.colName,
          indate : inDate,
        }
      }).then(function(response) {
        console.log(response.data);
        if(response.data.success == false){

        }else {
          console.log(response.data.results[0][holiday.colName]);
          if(response.data.results[0][holiday.colName] == 1) holiday.val = true;
          else holiday.val = false ;
        }
      });
    },
  }
};
</script>

<style scoped>
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