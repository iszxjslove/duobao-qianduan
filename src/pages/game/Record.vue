<template>
  <q-page>
    <infinite-scroll :api="listApi" :columns="columns">
      <template slot="body-cell-colors" slot-scope="cell">
        <div>
          <q-icon
            v-for="(c, k) in cell.value.split(',')"
            :key="k"
            name="lens"
            :color="$config.options.colors[c]"
          />
        </div>
      </template>
    </infinite-scroll>
  </q-page>
</template>

<script>
import { issues } from "../../assets/js/api";
import { date } from "quasar";

export default {
  name: "BillingPage",
  data() {
    return {
      listApi: issues,
      columns: [
        {
          field: "issue",
          title: this.$t("period"),
          align: "left"
        },
        { field: "code", title: this.$t("price"), align: "center" },
        {
          field: "last_digits",
          title: this.$t("number"),
          align: "center"
        },
        {
          field: "colors",
          title: this.$t("result"),
          align: "right"
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
