<template>
  <v-app>
    <div v-if="!enterServiceFlag">
      <MainLanding></MainLanding>
    </div>
    <div v-else>
      <ToolBar></ToolBar>
      <NoticeModal v-if="showModalFlag"></NoticeModal>
      <!--NavMini v-if="!showFullFlag"></NavMini>
      <NavFull v-if="showFullFlag"></NavFull-->
      <HomeContents v-if="progressBarFlag"></HomeContents>
      <Footer></Footer>
    </div>
    <ProgressBar ref="progresst"></ProgressBar>
    <ConfirmDialog ref="confirmt"></ConfirmDialog>
    <WaitProgressBar ref="wprogresst"></WaitProgressBar>
  </v-app>
</template> 

<script>
  import Config from "@/js/config.js";
  import Constant from '@/store/store_constant.js';
  import MainLanding from './MainLanding.vue';
  import ToolBar from './ToolBar.vue';
  import NavFull from './NavFull.vue';
  import NavMini from './NavMini.vue';
  import HomeContents from './HomeContents.vue';
  import NoticeModal from './NoticeModal.vue';
  import Footer from './Footer.vue';
  import ProgressBar from "@/components/common/ProgressBar.vue";
  import ConfirmDialog from "@/components/common/ConfirmDialog.vue";
  import WaitProgressBar from "@/components/common/WaitProgressBar.vue";
  export default {
    components: {
      MainLanding: MainLanding,
      ToolBar: ToolBar,
      NavMini: NavMini,
      NavFull: NavFull,
      HomeContents: HomeContents,
      NoticeModal: NoticeModal,
      Footer: Footer,
      ConfirmDialog,
      ProgressBar,
      WaitProgressBar
    },
    data() {
      return {
        showModalFlag: false,
        showFullFlag: true,
        enterServiceFlag: false,
        progressBarFlag: false,
      };
    },
    beforeCreate() {
      // this.$forceupdate;
    },
    created: function() {
      this.$EventBus.$on('popClose', this.popClose);
      this.$EventBus.$on('menuClick', this.menuClick);
      this.$EventBus.$on('enterService', this.enterService);
      this.$EventBus.$on('outService', this.outService);
      this.$EventBus.$on('progressBarLoad', this.progressBarLoad);
      let loginDt = localStorage.getItem('loginDt');
      let nDate = new Date();
      let nTerm = nDate.getTime() - Number(loginDt);
      console.log("Home.vue... loginDt : " + loginDt + " nDate : " + nDate + "nTerm : " + nTerm);

      if(this.$route.path == Config.pc_home) {

      }else {
        this.enterServiceFlag = true;
      }
    },
    mounted: function() {
      this.$root.confirmt = this.$refs.confirmt;
      this.$root.progresst = this.$refs.progresst;
      this.$root.wprogresst = this.$refs.wprogresst;
    },
    beforeDestroy() {
      this.$EventBus.$off('popClose');
      this.$EventBus.$off('menuClick');
      this.$EventBus.$off('enterService');
      this.$EventBus.$off('outService');
      this.$EventBus.$off('progressBarLoad');
    },
    methods: {
      popClose: function() {
        // console.log('popClose');
        this.showModalFlag = false;
      },
      menuClick: function(isDrawer) {
        // console.log('Home menuClick');
        this.showFullFlag = isDrawer;
      },
      enterService: function() {
        // console.log('enterService............');
        this.enterServiceFlag = true;
      },
      outService: function() {
        // console.log('outService............');
        this.enterServiceFlag = false;
        axios.post(Config.base_url + '/user/member/userlogout', {}).then(async function(response) {
          if(response.data.success == true) {
            console.log("LogOut... Session clear...");
          }
        });
        localStorage.clear();
        this.$store.commit(Constant.DELETE_USER);
        window.location.href = Config.location;
      },
      // 공통 modal mount 후에 진행
      progressBarLoad: function() {
        this.progressBarFlag = true;
        // console.log("Home vue.......progressBarLoad");
      }
    }
  }
</script>
<style scoped>
</style>