<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-tabs slot="extension" v-model="tabs" align-with-title light>
        <v-tabs-slider color="#1e99e8"></v-tabs-slider>
        <v-tab v-for="item in items" :key="item.id" v-on:click="moveTab(item.id)">{{ item.name }}</v-tab>
      </v-tabs>
      <EtpApplyList v-if="tabs==0" @moveUpdatePage="moveUpdatePage" :seq="seq" ref="list"></EtpApplyList>
      <EtpRegister v-if="tabs==1" @movePage="movePage()" :seq="seq" ref="form"></EtpRegister>
    </v-flex>
  </v-layout>
</template>

<script>
  import EtpApplyList from './EtpApplyList.vue'
  import EtpRegister from './EtpRegister.vue'
  export default {
    data() {
      return {
        seq: 0,
        tabs: 0,
        items: [{
          id: 0,
          name: "신청현황"
        }, {
          id: 1,
          name: "신규등록"
        }, ],        
      };
    },
    components: {
      EtpApplyList: EtpApplyList,
      EtpRegister: EtpRegister,
    },
    methods: {
      moveUpdatePage: function(seq) { //상세페이지 연결
        var vm = this;
        console.log("moveUpdatePage seq", seq);
        if(vm.$refs.form !== undefined) {
          vm.$refs.form.seq = seq;
          vm.$refs.form.getEtpRegisterView();
          vm.tabs = 1;
        }
      },
      movePage: function() { //조회페이지 연결 후 리로딩
        var vm = this;
        vm.tabs = 0;
        if(vm.$refs.list !== undefined) {
          vm.$refs.list.getEtpApplyList();
          vm.$refs.list.getEtpApplyDistCnt();
          vm.$refs.list.getEtpApplyIndexCnt();
          vm.$refs.list.getEtpApplyCodeCnt();
          vm.$refs.list.getEtpApplyInavCnt();
        }
      },
      moveTab: function(tab_id) {
        //탭이동
        var vm = this;
        console.log("moveTab", vm.tabs);
        if (vm.tabs == 0) {
          if (vm.$refs.form !== undefined) {
            vm.$refs.form.seq = 0;
            vm.$refs.form.getEtpRegisterView();
          }
        }
        vm.tabs = tab_id;
      }
    },
  }
</script>
<style scoped>
</style>