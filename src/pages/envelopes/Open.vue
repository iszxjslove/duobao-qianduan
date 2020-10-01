<template>
  <div>
    <envelopes-dialog v-model="dialog" :code="code" :token="token" />
  </div>
</template>

<script>
import EnvelopesDialog from "../../components/Envelopes";

export default {
  name: "EnvelopesOpenPage",
  components: {
    EnvelopesDialog
  },
  data() {
    return {
      code: "",
      token: "",
      dialog: false
    };
  },
  mounted() {
    let { code, token } = this.$route.query;
    if (code && token) {
      this.code = code;
      this.token = token;
      this.dialog = true;
    }
  }
};
</script>
