<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { LocalStorage } from "quasar";

export default {
  name: "App",
  updated() {
    if (this.$route.query.referrer) {
      this.$q.localStorage.set(
        this.$config.key("referrer"),
        this.$route.query.referrer
      );
    }
  },
  preFetch({ store, route, router }) {
    store.commit("member/autoToken");
    store.commit("member/setUserinfo");
  }
};
</script>
