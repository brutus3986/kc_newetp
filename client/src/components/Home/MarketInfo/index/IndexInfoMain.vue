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
      <v-layout row wrap class="content_margin con_wrap">
        <router-view></router-view>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        activeTab: 0,
        tabs: [{
          id: 1,
          name: "KRX",
          route: "/home/info/indexinfo/krxindexlist"
        }, {
          id: 2,
          name: "FnGuide",
          route: "/home/info/indexinfo/fngindexlist"
        }, ]
      };
    },
    created() {
      // F5 사용자를 위한 타이틀 처리
      this.$EventBus.$emit("menuTitleChange", "MARKET INDEX INFO");
    },
    mounted: function() {
      this.activeTab = 0;
      this.pageMove(this.tabs[0]);
    },
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
        console.log("pageMove.... " + tab.route);
        this.$router.push({
          path: tab.route
        });
      }
    }
  }
</script>
<style scoped>
</style>