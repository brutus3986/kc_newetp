<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-tabs slot="extension" v-model="activeTab" align-with-title light>
        <v-tabs-slider color="#35e0e2"></v-tabs-slider>
        <v-tab v-for="tab of tabs" :key="tab.id" @click="pageMove(tab)">{{ tab.name }}</v-tab>
      </v-tabs>
      <v-tabs-items v-model="activeTab">
        <v-tab-item v-for="tab of tabs" :key="tab.id"></v-tab-item>
      </v-tabs-items>
      <router-view></router-view>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    props: [],
    data() {
      return {
        activeTab: 0,
        inx: 1,
        tabs: [
          {
            /* ETP PORTAL */
            id: 1,
            name: "ETP PORTAL",
            route: '/home/info/etpportal/portal'
          },  {
            /* ETP 스크리너 ( 탭에 노출은 'ETF Screener' ) */
            id: 2,
            name: "ETF Screener",
            route: '/home/info/etpportal/screener'
          }, 
        ],
      };
    },
    created() {
      // F5 사용자를 위한 타이틀 처리
      this.$EventBus.$emit("menuTitleChange", "ETP PORTAL");
    },
    mounted: function() {
      this.activeTab = 0;
      this.pageMove(this.tabs[0]);
    },
    created: function() {},
    beforeUpdated: function() {},
    components: {
    },
    updated: function() {
      if(this.activeTab == 0) {
        this.activeTab = 0;
        this.pageMove(this.tabs[0]);
      }
    },
    methods: {
      pageMove: function(tab) {
        console.log("EtpPortalMain.vue pageMove.... " + tab.route);
        this.$router.push({
          path: tab.route
        });
      }
    }
  }
</script>
<style scoped>
</style>