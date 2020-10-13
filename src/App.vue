<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { LocalStorage } from "quasar";

export default {
  name: "App",
  async mounted() {
    const token = await this.$store.dispatch("member/getToken");
    if (token) {
      this.$store.dispatch("common/init");
    }
  },
  preFetch({ store, route, router }) {
    store.commit("member/autoToken");
    store.commit("member/setUserinfo");
  }
};
</script>
