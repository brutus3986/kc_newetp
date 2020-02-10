<template>
  <v-dialog v-model="csModalFlag" persistent max-width="800px">
    <v-card flat class="support" height="600px">
      <v-card-title>
        <h5>고객지원</h5>
        <v-spacer></v-spacer>
        <v-btn icon @click="closeModal">
          <v-icon>close</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
      <p>
        서비스 관련 문의 및 개선해야 할 사항을 남겨주시면 빠른시간 내에 답변 드리겠습니다.
      </p>
        <v-textarea
          label
          outline
          color="blue"
          height="400px"
          ref="contents"
          v-model="contents"
          :placeholder="defaultHodler"
        ></v-textarea>
      </v-card-text>
      <div class="text-xs-center">
        <v-btn dark depressed color="primary" @click="fn_saveCustSupport">전송하기</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
  import Config from "@/js/config.js";
  import axiosutil from "@/js/common/tool/axiosutil.js";
  export default {
    data() {
      return {
        isContext: true,
        defaultContents: '',
        defaultHodler: '',
        contents: '',
        csModalFlag: true
      };
    },
    components: {
    },
    created: function() {},
    beforeDestroy() {},
    mounted: function() {
      console.log("CsModal..........: " + this.csModalFlag);
      console.log("name : " + this.$store.state.user.name);
      if(this.$store.state.user.name !== '') {
        let holder = "";
        holder = "사용자명 : " + this.$store.state.user.name + "\n\n";
        holder += "기관명 : " + this.$store.state.user.inst_name + "\n\n";
        holder += "내용 : ";
        this.contents = holder;
      }else {
        this.defaultHodler = "사용자명:\n\n" + "기관명:\n\n" + "내용:";
      }
    },
    methods: {
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
              vm.closeModal();
            }
          } catch (ex) {
            console.log("error", ex);
          }
        }, function(error) {
          if(error) {
            if(vm.$root.confirmt.open('확인', error, {}, 4)) {}
          }
        });
      },
      closeModal: function() {
        this.$emit("closeCsModal");
        this.csModalFlag = false;
      }
    }
  }
</script>
<style scoped>
</style>