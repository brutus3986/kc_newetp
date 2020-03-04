<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
    <v-card>
      <v-card-title>
      <span class="headline">기초지수 장애내용</span>
      </v-card-title>

      <v-card-text>
        <v-container grid-list-md>
          <v-text-field v-model="mapItem.trade_date" readonly label="장애발생일자"></v-text-field>
          <v-text-field v-model="mapItem.trade_time" readonly label="장애발생시간"></v-text-field>
          <v-text-field v-model="mapItem.agency_name" readonly label="지수산출기관"></v-text-field>
          <v-text-field v-model="mapItem.index_name" readonly label="지수명"></v-text-field>
          <v-text-field v-model="mapItem.index_type" readonly label="지수산출유형"></v-text-field>
          <v-text-field v-model="mapItem.fault_name" readonly label="장애유형"></v-text-field>
          <v-textarea v-model="mapItem.etp_list" 
            readonly
            label="관련 ETP LIST"></v-textarea>
          <v-textarea v-model="mapItem.fault_bigo" 
            readonly
            label="장애내용"></v-textarea>
          <v-text-field  v-if="mapItem.save_file_name.length !== 0" @click.stop="downloadFile(mapItem)"
            v-model="mapItem.org_file_name" readonly label="장애발생사유서"></v-text-field>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="black darken-1" flat @click="closeItem">CANCEL</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Config       from "@/js/config.js"

export default {
  props:['mapItem'],
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
  },  
  watch: {
  },
  components: {
      
  },
  created: function() {
      
  },
  beforeDestroy() {
      
  },
  mounted: function() {
    this.dialog = true;
    console.log(this.mapItem);
  },
  methods: {
    closeItem: function() {
      let vm = this;
      vm.$emit("closeModal");
      vm.dialog = false;
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
}
</script>
<style scoped>
.v-card__text .container {
  padding-top: 0;
}
</style>