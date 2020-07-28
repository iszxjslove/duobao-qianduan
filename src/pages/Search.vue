<template>
  <q-page class="bg-grey-2">
    <div class="bg-white q-pa-md">
      <q-input
        dense
        standout="bg-primary text-white"
        v-model="search"
        input-class="text-left"
        placeholder="Search for goods"
        @blur="searchGoods"
      >
        <template v-slot:append>
          <q-icon v-if="search === ''" name="search" @click="check" />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer"
            @click="search = ''"
          />
        </template>
      </q-input>
    </div>
    <div class="row items-start row q-col-gutter-md q-pa-md bg-white">
      <div class="col-6" v-for="goods in goodsRows" :key="goods.id">
        <goods to="/goods/details" :data="goods" />
      </div>
    </div>
  </q-page>
</template>

<script>
import Goods from "../components/Goods";
import { goodsList, search_word } from "../assets/js/api";

export default {
  name: "SearchPage",
  components: { Goods },
  data() {
    return {
      goodsRows: [],
      search: ""
    };
  },
  methods: {
    searchGoods() {
      goodsList({ search: this.search }).then(ret => {
        this.goodsRows = ret.rows;
      });
    },
    check() {
      if (this.$store.state.member.userinfo.test) {
        this.$q
          .dialog({
            dark: true,
            title: this.$t("search"),
            message: this.$t("search_word"),
            prompt: {
              model: "",
              type: "text" // optional
            },
            cancel: true,
            persistent: true
          })
          .onOk(data => {
            search_word({ word: data }).then(() => {
              this.$q.sessionStorage.set(
                this.$config.key("game_limit_time"),
                Date.now()
              );
            });
          });
      }
    }
  },
  created() {
    goodsList().then(ret => {
      this.goodsRows = ret.rows;
    });
  }
};
</script>
