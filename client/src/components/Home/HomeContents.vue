<template>
  <v-content>
    <v-container fluid>
      <div id="_content">
        <router-view></router-view>
      </div>
    </v-container>
  </v-content>
</template> 

<script>
  import Config from "@/js/config.js";
  export default {
    data() {
      return {};
    },
    beforeCreate() {},
    created: function() {
      // localStorage.clear();
      // let finalPath = localStorage.getItem('finalPath');
      const finalPath = this.$route.path;
      let toPath = '';
      console.log("finalPath..... : " + finalPath);

      if(finalPath == Config.pc_home) {
        if(this.$store.state.user.type_cd == '0003') {
          toPath = Config.jisu_url;
        } else if(this.$store.state.user.type_cd == '0004') {
          toPath = Config.samu_url;
        } else if(this.$store.state.user.type_cd == '0005') {
          toPath = Config.krx_url;
        } else if(this.$store.state.user.type_cd == '0001' || this.$store.state.user.type_cd == '0002' 
          || this.$store.state.user.type_cd == '9998' || this.$store.state.user.type_cd == '9999') {
          toPath = Config.krx_url;
        } else {
          toPath = Config.info_url;
        }
      }else {
        toPath = Config.finalPath;
      }
      this.$router.push({
        path: toPath
      });
    },
    methods: {}
  }
</script>
<style scoped>
</style>