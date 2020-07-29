<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />
      <agreement-dialog
        v-model="dialog"
        :content="content"
        :title="title"
        cancelLabel="close"
        @cancel="closeNotice"
      />
    </q-page-container>
    <q-footer class="bg-grey-1">
      <q-toolbar>
        <q-tabs
          v-model="tab"
          align="justify"
          class="full-width text-grey"
          content-class="justify-between"
          active-color="primary"
          indicator-color="primary"
          dense
        >
          <q-route-tab
            to="/home"
            name="home"
            icon="o_home"
            :label="$t('home')"
          />
          <q-route-tab
            to="/search"
            name="search"
            icon="search"
            :label="$t('search')"
          />
          <q-route-tab
            to="/game"
            name="game"
            icon="o_games"
            :label="$t('game')"
            v-if="isLogin"
          />
          <q-route-tab
            to="/my"
            name="my"
            icon="person_outline"
            :label="$t('my')"
          />
        </q-tabs>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import AgreementDialog from "../components/AgreementDialog";
import { agreement } from "../assets/js/api";

export default {
  name: "MainLayout",
  components: {
    AgreementDialog
  },
  preFetch({ store }) {
    store.commit("member/autoToken");
    store.commit("member/setUserinfo");
  },
  data() {
    return {
      tab: "mails",
      dialog: false,
      title: " ",
      content: ""
    };
  },
  methods: {
    getNotice() {
      agreement("home_pop_up_notice").then(ret => {
        this.content = ret.content;
        this.title = ret.title;
        this.dialog = true;
      });
    },
    closeNotice() {
      this.dialog = false;
      this.$q.sessionStorage.set(this.$config.key("home_notice_read"), 1);
    }
  },
  computed: {
    isLogin() {
      return this.$q.sessionStorage.getItem(this.$config.key("auth"));
    }
  },
  mounted() {
    let homeNoticeRead = this.$q.sessionStorage.getItem(
      this.$config.key("home_notice_read")
    );
    if (!homeNoticeRead) {
      this.getNotice();
    }
  }
};
</script>
