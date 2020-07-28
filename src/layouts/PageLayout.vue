<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-grey-3 text-black">
      <q-toolbar>
        <q-btn flat round dense icon="keyboard_arrow_left" v-go-back.single />
        <q-toolbar-title>
          {{ $t($route.meta.title) }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  preFetch({ store }) {
    store.commit("member/autoToken");
    store.commit("member/setUserinfo");
  },
  data() {
    return {
      tab: "mails"
    };
  },
  computed: {
    isLogin() {
      return this.$q.sessionStorage.getItem(this.$config.key("auth"));
    }
  }
};
</script>
