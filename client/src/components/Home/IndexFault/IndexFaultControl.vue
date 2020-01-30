<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-tabs slot="extension" v-model="activeTab" align-with-title light>
        <v-tabs-slider color="#35e0e2"></v-tabs-slider>
        <v-tab v-for="tab of tabs" :key="tab.id" @click="fn_pageMove(tab.id)">{{ tab.name }}</v-tab>
      </v-tabs>
      <IndexMonitorMain v-if="activeTab==0"></IndexMonitorMain>
      <IndexFaultList v-if="activeTab==1"></IndexFaultList>
    </v-flex>
  </v-layout>
</template>

<script>
  import Config from "@/js/config.js";
  import IndexMonitorMain from "@/components/Home/IndexFault/IndexMonitorMain.vue";
  import IndexFaultList from "@/components/Home/IndexFault/IndexFaultList.vue";
  export default {
    data() {
      return {
        activeTab: 0,
        tabs: [{id: 0, name: "모니터링"}, 
          {id: 1, name: "장애이력"},
        ],
      };
    },
    components: {
      IndexMonitorMain,
      IndexFaultList,
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