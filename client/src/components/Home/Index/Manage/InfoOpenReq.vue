<template>
  <v-container>
    <v-layout justify-center column fill-height>
      <v-flex>
        <v-card>
          <v-card flat>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">정보공개 요청처리</h3>
                <span>지수 구성종목의 유동비율, cap비율 및 다양한 factor 비율과 기준시가총액 등 지수의 상세 정보를 요청자와 공유합니다.</span>
              </div>
            </v-card-title>
          </v-card>

          <table id="index_table" class="tbl_type" width="100%">
            <thead>
              <tr>
                <th class="txt_left">reqID</th>
                <th class="txt_left">신청기관</th>
                <th class="txt_left">지수</th>
                <th class="txt_left">지수코드</th>
                <th class="txt_left">요청일자</th>
                <th>요청처리</th>
              </tr>
            </thead>
          </table>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import $ from 'jquery'
  import dt from 'datatables.net'
  import Config from "@/js/config.js";
  import axiosutil from "@/js/common/tool/axiosutil.js";
  var reqTable;
  export default {
    props: [],
    data() {
      return {
        selected: [],
        message: "",
        reqFlag: true,
        results: [],
      };
    },
    mounted: function() {
      var vm = this;
      $('#index_table, tbody').on('click', 'button', function() {
        var data = reqTable.row($(this).parents('tr')).data();
        vm.selected = data;
        console.log("Name = " + $(this).attr('name'));
        if($(this).attr('name') == "ok") {
          vm.dialogOpen('1', data);
        } else {
          vm.dialogOpen('2', data);
        }
      });
      reqTable = $('#index_table').DataTable({
        "processing": true,
        "serverSide": false,
        "info": false, // control table information display field
        "stateSave": true, //restore table state on page reload,
        "lengthMenu": [
          [10, 20, 50, -1],
          [10, 20, 50, "All"]
        ],
        paging: false,
        searching: false,
        data: [],
        columns: [{
          "data": "REG_ID",
          "orderable": true,
          className: 'txt_left'
        }, {
          "data": "INST_NAME",
          "orderable": true,
          className: 'txt_left'
        }, {
          "data": "F16002",
          "orderable": true,
          className: 'txt_left'
        }, {
          "data": "F16013",
          "orderable": true,
          className: 'txt_left'
        }, {
          "data": "REG_TIME",
          "orderable": true,
          className: 'txt_left'
        }, {
          "data": null,
          "orderable": false,
          "align": "center",
          className: 'dt-body-center',
          defaultContent: "<div class='tooltip'><button type='button' name='ok' class='btn_icon v-icon material-icons '>thumb_up_alt</button><span class='tooltiptext' style='width:40px;'>승인</span></div><div class='tooltip'><button type='button' name='no' class='btn_icon v-icon material-icons'>thumb_down_alt</button><span class='tooltiptext' style='width:40px;'>거절</span></div>"
        }]
      });
      vm.getInfoOpenReqList();
    },
    created: function() {},
    beforeDestroy() {},
    methods: {
      getInfoOpenReqList: function() {
        console.log("getInfoOpenReqList");
        var vm = this;
        axiosutil.axiosCall({
          "url": Config.base_url + "/user/index/getinfoopenreqlist",
          "data": {},
          "method": "get",
          "paramKey": "params"
        }, function(response) {
          try {
            if(response.data.success == false) {
              if(vm.$root.confirmt.open('확인', "해당 신청현황이 없습니다", {}, 1)) {}
            } else {
              var items = response.data.results;
              //console.log("response=" + JSON.stringify(items));
              vm.results = items;
              reqTable.clear().draw();
              reqTable.rows.add(vm.results).draw();
            }
          } catch (ex) {
            console.log("error", ex);
          }
        }, function(error) {
          if(error && vm.$root.confirmt.open('확인', error, {}, 4)) {}
        });
      },
      async dialogOpen(flag, item) {
        if(flag == '1') {
          this.message = "정보 공개 요청 승인 하시겠습니까?";
          this.reqFlag = true;
        } else {
          this.message = "정보 공개 요청 거절 하시겠습니까?";
          this.reqFlag = false;
        }
        if(await this.$root.confirmt.open('승인', this.message, {}, 2)) {
          this.updateIndexOpenYn(this.$root.confirmt.val, item);
        }
      },
      updateIndexOpenYn: function(flag, item) {
        this.dialog = false;
        var vm = this;
        if(flag == 'Y') {
          console.log("JISU_ID=" + this.selected.F16013);
          axiosutil.axiosCall({
            "url": Config.base_url + '/user/index/updateIndexOpenYn',
            "data": {
              flag: flag,
              reqFlag: this.reqFlag,
              JISU_ID: this.selected.F16013,
              INST_CD: this.selected.INST_CD
            },
            "method": "post",
            "paramKey": "params"
          }, function(response) {
            this.getInfoOpenReqList();
          }, function(error) {
            if(error && vm.$root.confirmt.open('확인', error, {}, 4)) {}
          });
        }
      }
    }
  };
</script>
<style scoped>
  table.v-table tbody td,
  table.v-table tbody th {
    height: 30px;
  }
</style>