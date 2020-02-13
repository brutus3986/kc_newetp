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
      console.log("finalPath..... : " + finalPath);

      if(finalPath == Config.pc_home) {
        if(this.$store.state.user.type_cd == '0003') {
          this.$router.push({
            path: Config.jisu_url
          });
        } else if(this.$store.state.user.type_cd == '0004') {
          this.$router.push({
            path: Config.samu_url
          });
        } else if(this.$store.state.user.type_cd == '0005') {
          this.$router.push({
            path: Config.krx_url
          });
        } else if(this.$store.state.user.type_cd == '0001' || this.$store.state.user.type_cd == '0002' 
          || this.$store.state.user.type_cd == '9998' || this.$store.state.user.type_cd == '9999') {
          this.$router.push({
            path: Config.etp_url
          });
        } else {
          this.$router.push({
            path: Config.info_url
          });
        }
      }else {
        this.$router.push({
          path: Config.finalPath
        });
      }
    },
    methods: {}
  }
</script>
<style scoped>
</style>