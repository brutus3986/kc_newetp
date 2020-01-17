<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-tabs slot="extension" v-model="activeTab" align-with-title light>
        <v-tabs-slider color="#1e99e8"></v-tabs-slider>
        <v-tab v-for="tab of tabs" :key="tab.id" @click="pageMove(tab.id)" >
            {{ tab.name }}
        </v-tab>                
      </v-tabs>
      <LpOperControl 
        @fn_setActiveTab="fn_setActiveTab">
      </LpOperControl>
    </v-flex>
  </v-layout>
</template>

<script>
import LpOperControl from  '@/components/Home/Lp/Manage/LpOperControl.vue'

export default {
  data() {
    return {
      activeTab: 0,
      tabs: [
        {id: 0, name: "LP 운용정보", route: '/lp/manage/LpOperInfo'},
        {id: 1, name: "PDF 관리", route: '/lp/manage/LpOperPdf'},
      ],
    };
  },
  components: {
    LpOperControl,
  },
  created() {
    // console.log("LpOperMain.......created.........");

  },
  destroyed() {
    // console.log("LpOperMain.......destroyed.........");
  },
  mounted: function() {
    this.activeTab = 0;
    this.pageMove(0);
  },
  methods: {
    pageMove : function(tab_id) {
      console.log("pageMove : " + tab_id);
      this.$EventBus.$emit("showLpOper", {tab_id:tab_id, paramData : {}});
    },

    /*
      *  ETP 운용정보 리스트가 조회된 경우 첫번째 행의 레코드를 보관한다.
      *  2019-05-03  bkLove(촤병국)
      */
    fn_setFirstData: function(firstData) {
      var vm = this;
      vm.firstData = "";
      vm.firstData = firstData;
    },
    /*
      *  ETP 운용정보 리스트에서 PDF 행을 선택한 경우
      *  2019-05-03  bkLove(촤병국)
      */
    fn_setActiveTab: function(activeTab, paramData) {
      this.activeTab = activeTab;
      this.pageMove(activeTab, paramData);
    }
  }
};
</script>
