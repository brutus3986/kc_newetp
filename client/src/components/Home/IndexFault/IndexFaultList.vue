<template>
  <div>
    <v-container>
      <v-layout row wrap class="content_margin">
        <v-flex grow class="conWidth_left">
          <v-card flat>
          <div class="title01_w case2">
            <v-card-title primary-title>
              <div class="title_wrap01">
                <h3 class="headline subtit">기초지수 장애이력 관리</h3>
                <div class="right_btn">
                  <v-select
                    :items="agencyList"
                    item-text="agency_name"
                    item-value="type_cd"
                    label="지수산출기관"
                    dense
                    v-model="agency_cd"
                    @change="changeCombo"
                  ></v-select>
                </div>
              </div>
            </v-card-title>
            </div>
          </v-card>
          <v-card flat>
            <div class="table-box-wrap">
              <div class="table-box" style="min-height:690px;">
                <table class="tbl_type ver7" style="table-layout:fixed;">
                  <colgroup>
                    <col width="7%">
                    <col width="10%">
                    <col width="15%">
                    <col width="8%">
                    <col width="15%">
                    <col width="30%">
                    <col width="5%">
                    <col width="10%">
                  </colgroup>
                  <thead>
                    <tr>
                      <th width="8%">일자</th>
                      <th width="10%">지수산출기관</th>
                      <th width="15%">지수명</th>
                      <th width="8%">지수유형</th>
                      <th width="15%">장애유형</th>
                      <th width="30%">장애내용</th>
                      <th width="5%">상세</th>
                      <th width="10%">장애발생사유서</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in mList" :key="item.seq">
                      <td>{{item.trade_date}}</td>
                      <td>{{item.agency_name}}</td>
                      <td>{{item.index_name}}</td>
                      <td>{{item.index_type}}</td>
                      <td>{{item.fault_name}}</td>
                      <td class="textoverflow txt_left">{{item.fault_bigo}}</td>
                      <td @click.stop="openModal(item)"><v-icon color="green darken-2" style="cursor: pointer">details</v-icon></td>
                      <td v-if="item.save_file_name !== null && item.save_file_name.length !== 0" 
                        @click.stop="downloadFile(item)"><v-icon color="orange" style="cursor: pointer">print</v-icon></td>
                      <td v-else><v-icon color="gray">print</v-icon></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container fluid>
      <div class="text-xs-center">
        <v-pagination
          v-model="page"
          :length="totPage"
          :total-visible="20"
          @input="getList"
        ></v-pagination>
      </div>
    </v-container>
    <IndexFaultModal v-if="ModalFlag" :mapItem="mapItem" @closeModal="closeModal"></IndexFaultModal>
  </div>
</template>

<script>
import Config       from "@/js/config.js"
import util from "@/js/common/tool/util.js"
import IndexFaultModal from "./IndexFaultModal.vue"

export default {
  data() {
    return {
      mList: [],
      mapItem: {},
      page: 1,
      perPage: 20,
      totcnt: 0,
      totPage: 1,
      agency_cd: '0',
      agencyList: [],
      ModalFlag: false,
    }
  },
  components: {
    IndexFaultModal,
  },
  created() {
    this.getAgencyList();
  },
  mounted: function() {
    // console.log("ViewAllEtp..............");
    this.getTotcnt();
    this.getList();
  },
  methods: {
    openModal: function(item) {
      // console.log("openUpdateModal");
      this.mapItem = item;
      this.ModalFlag = true;
    },
    closeModal: function() {
      this.ModalFlag = false;
      // this.getTotcnt();
      // this.getList();
    },
    getTotcnt: function() {
      var vm = this;

      axios.get(Config.base_url+'/user/indexFault/getindexfaulttotcnt', {
        params: {
          "agency_cd" : vm.agency_cd,
        }
      }).then(function(response) {
        // console.log(response.data.results);
        if(response.data.success == false){
          alert(response.data.message);
        }else {
          vm.totcnt = response.data.results[0].totcnt;
          vm.totPage = Math.ceil(vm.totcnt / vm.perPage);
        }
      });
    },
    getList: function() {
      var vm = this;

      // console.log("page : " + vm.page);
      axios.get(Config.base_url+'/user/indexFault/getindexfaultlist', {
        params: {
          "page" : vm.page,
          "perPage" : vm.perPage,
          "agency_cd" : vm.agency_cd,
        },
      }).then(function(response) {
        if(response.data.success == false){
          alert(response.data.message);
        }else {
          let tList = response.data.results;
          for(let i=0; i < tList.length; i++) {
            tList[i].trade_date = util.formatDate1(tList[i].trade_date);
          }
          vm.mList = tList;
        }
      });
    },
    getAgencyList: function() {
      let vm = this;
      axios.get(Config.base_url+'/user/indexFault/getindexagencylist', {
        params: {
          // "bbs_id" : vm.bbs_id,
        }
      }).then(function(response) {
        if(response.data.success == false){
          alert(response.data.message);
        }else {
          vm.agencyList = response.data.results;
          vm.agencyList.unshift({type_cd:'0', agency_name:'전체'});
        }
      });
    },
    changeCombo: function() {
      this.getTotcnt();
      this.getList();
    },
    downloadFile: function(item) {
      // console.log("save_file_name : " + item.save_file_name);

      axios.get(Config.base_url+'/user/indexFault/getindexfaultfile', {
        params: {
          "save_file_name" : item.save_file_name,
        },
        responseType: 'blob', // important
      }).then(function(response) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', item.org_file_name); //or any other extension
        document.body.appendChild(link);
        link.click();
      });
    },
  }
};
</script>

<style scoped>
tr .textoverflow{
  text-overflow:ellipsis; 
  overflow:hidden; 
  white-space: nowrap;
}
</style>