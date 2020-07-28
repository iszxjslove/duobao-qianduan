<template>
  <q-page>
    <infinite-scroll :api="listApi" :columns="columns" />
  </q-page>
</template>

<script>
import InfiniteScroll from "../components/InfiniteScroll";
import { billingList } from "../assets/js/api";
import { date } from "quasar";

export default {
  name: "BillingPage",
  components: {
    InfiniteScroll
  },
  data() {
    return {
      listApi: billingList,
      columns: [
        {
          field: "money",
          title: this.$t("money"),
          formatter: this.formatMoney,
          class: this.formatMoneyClass
        },
        { field: "memo", title: this.$t("memo") },
        {
          field: "createtime",
          title: this.$t("time"),
          formatter: this.formatDate
        }
      ]
    };
  },
  methods: {
    formatMoney(money) {
      if (money > 0) {
        return "+" + money;
      }
      return money;
    },
    formatMoneyClass(money) {
      if (money > 0) {
        return "text-positive";
      }
      return "text-negative";
    },
    formatDate(timeStamp) {
      return date.formatDate(timeStamp, "MM-DD HH:mm");
    }
  }
};
</script>
