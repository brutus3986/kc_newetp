<template>
  <v-dialog v-model="dialog" persistent content-class="progressbar_w">
    <template>
      <v-progress-circular :size="50" indeterminate></v-progress-circular>
    </template>
  </v-dialog>
</template>

<script>
export default {
  props: [],
  data() {
    return {
      dialog: false
    };
  },
  components: {
  },
  computed: {},
  created: function() {
    // console.log("ProgressBar created..........");
  },
  beforeDestroy() {},
  mounted: function() {
    // console.log("ProgressBar mounted..........");
    this.$EventBus.$emit('progressBarLoad');

  },
  methods: {
    open() {
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    }
  }
};
</script>