<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-tabs slot="extension" v-model="activeTab" align-with-title light>
        <v-tabs-slider color="#35e0e2"></v-tabs-slider>
        <v-tab v-for="tab of tabs" :key="tab.id" @click="fn_pageMove(tab.id)">{{ tab.name }}</v-tab>
      </v-tabs>
      <IndexFaultList v-if="activeTab==0"></IndexFaultList>
      <IndexMonitorMain v-if="activeTab==1"></IndexMonitorMain>
    </v-flex>
  </v-layout>
</template>

<script>
  import util from "@/js/util.js";
  import Config from "@/js/config.js";
  import IndexFaultList from "@/components/Home/IndexFault/IndexFaultList.vue";
  import IndexMonitorMain from "@/components/Home/IndexFault/IndexMonitorMain.vue";
  export default {
    data() {
      return {
        activeTab: 0,
        tabs: [{id: 0, name: "장애이력"}, 
          {id: 1, name: "모니터링"},
        ],
      };
    },
    components: {
      IndexFaultList,
      IndexMonitorMain,
    },
    created() {
    },
    mounted() {
    },
    methods: {
      fn_pageMove(tab_id) {
        this.activeTab = tab_id;
      },
    }
  }
</script>