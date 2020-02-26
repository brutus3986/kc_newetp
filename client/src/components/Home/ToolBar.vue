<template>
  <v-toolbar
    fixed
    app
    clipped-left
    clipped-right
    dark
    color="#434343"
    class="elevation-0"
    style="z-index:100;"
  >
    <v-toolbar-title>
      <div class="logo_w">
        <a class="routerlink logo" @click="moveHome">
          EMP
          <span>
            ETP Management
            <br />Platform
          </span>
        </a>
      </div>
    </v-toolbar-title>
    <ContextMenu></ContextMenu>
    <span class="top_cont_title">{{menuTitle}}</span>
    <v-spacer></v-spacer>
    <!--고객지원-->
    <v-btn flat class="support_btn" @click="csDialog=true">
      <v-icon>send</v-icon> <span style="margin-left:5px;">고객지원</span>
    </v-btn>
    <CsModal v-if="csDialog" @closeCsModal="csDialog=false"></CsModal>
    <UserInfo></UserInfo>
  </v-toolbar>
</template>

<script>
  import ContextMenu from './ContextMenu.vue';
  import UserInfo from './UserInfo.vue';
  import CsModal from '@/components/common/modal/CsModal.vue';
  import Config from "@/js/config.js";
  import Constant from '@/store/store_constant.js';
  import tool from "@/js/common/tool/tool.js";
  import axiosutil from "@/js/common/tool/axiosutil.js";
  export default {
    data() {
      return {
        menuTitle: "MARKET ETP INFO",
        clickTimer: 0,
        contents: "",
        csDialog: false
      };
    },
    components: {
      ContextMenu,
      CsModal,
      UserInfo,
    },
    created: function() {
      this.$EventBus.$on('menuTitleChange', this.menuTitleChange);
    },
    beforeDestroy() {
      this.$EventBus.$off('menuTitleChange');
    },
    mounted: function() {
      //        this.contents = this.defaultContents;
      /* 지수 사업자 */
      if(this.$store.state.user.type_cd == '0003') {
        this.menuTitle = "지수관리";
      /* 사무수탁관리사 */
      }else if(this.$store.state.user.type_cd == '0004') {
        this.menuTitle = "운용지원";
      /* ETP 발행사 */
      } else if(this.$store.state.user.type_cd == '0001' || this.$store.state.user.type_cd == '0002' 
        || this.$store.state.user.type_cd == '9998' || this.$store.state.user.type_cd == '9999') {
        this.menuTitle = "ETP운영관리";
      } else {
        this.menuTitle = "ETP PORTAL";
      }
    },
    methods: {
      /*
          contextMenuClick: function() {
            console.log('ToolBar contextMenuClick!!!');
            var vm = this;
            this.isContext = !this.isContext;
            vm.clickTimer = 1;
            setTimeout(function() {
              vm.clickTimer = 0;
            }, 1000);
          },
          contextMenuOver: function() {
            console.log('ToolBar contextMenuClick!!!');
            if(this.clickTimer == 0) {
             this.isContext = true;
           }
         },
      */
      menuTitleChange: function(title) {
        //console.log("menuClick........: " + menu.title);        
        this.menuTitle = title;
      },
      moveHome: function() {
        window.location.href = Config.location;
      },
      /*
       *   고객지원 정보를 저장한다.
       *   2019-06-13  bkLove(촤병국)
       */
      async fn_saveCustSupport() {
        var vm = this;
        if(await !vm.contents || vm.contents.length == 0 || vm.contents.replace(/^\s+|\s+$/g, "").length == 0) {
          if(vm.$root.confirmt.open('', "내용을 입력해 주세요", {}, 1)) {
            return false;
          }
        }
        axiosutil.axiosCall({
          "url": Config.base_url + "/user/etc/saveCustSupport",
          "data": {
            contents: vm.contents
          },
          "method": "post"
        }, function(response) {
          try {
            var resultData = response.data;
            if(resultData.msg) {
              if(vm.$root.confirmt.open('', resultData.msg, {}, 1)) {}
              if(!resultData.result) {
                return false;
              }
            }
            if(resultData.result) {
              vm.contents = "";
              vm.csDialog = false;
            }
          } catch (ex) {
            console.log("error", ex);
          }
        }, function(error) {
          if(error) {
            if(vm.$root.confirmt.open('확인', error, {}, 4)) {}
          }
        });
      }
    }
  }
</script>
<style scoped>
  .v-menu__content.menuable__content__active {
    left: 60% !important;
  }
</style>