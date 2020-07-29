<template>
  <q-dialog v-model="dialog" position="bottom">
    <q-card class="full-width">
      <q-card-section>
        <q-input
          outlined
          label="转入金额"
          v-model="amount"
          :placeholder="
            userinfo.money
              | symbol
              | concat($t('available_balance'), ' ', 'before')
          "
        >
          <template v-slot:append>
            <span
              class="cursor-pointer text-primary"
              @click="amount = userinfo.money"
            >
              all
            </span>
          </template>
          <template v-slot:after>
            <q-btn
              @click="submit"
              round
              color="primary"
              unelevated
              dense
              icon="check"
            />
          </template>
        </q-input>
      </q-card-section>
      <q-list separator class="q-mb-md">
        <q-item v-for="item in list" :key="item.id" tag="label" v-ripple>
          <q-item-section side top>
            <q-radio v-model="selectProductId" :val="item.id" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
            <q-item-label caption lines="3">{{ item.desc }}</q-item-label>
          </q-item-section>
          <q-item-section side top>
            <q-item-label caption>
              {{ item.type_text | periodUnit(item) }}
            </q-item-label>
            <q-item-label>{{ item.rate | toFixed }} %</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-dialog>
</template>

<script>
import {
  financeProducts,
  userinfo,
  financeBalanceInto
} from "../assets/js/api";

export default {
  name: "FinanceProducts",
  filters: {
    toFixed: function(value) {
      return typeof value === "string"
        ? Number(value).toFixed(2)
        : value.toFixed(2);
    },
    periodUnit: function(value, item) {
      return value + item.period + item.period_unit_text;
    }
  },
  data() {
    return {
      dialog: false,
      list: [],
      selectProductId: 0,
      amount: ""
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.member.userinfo;
    }
  },
  methods: {
    loadProducts() {
      financeProducts().then(ret => {
        this.list = ret;
        this.selectProductId = ret && ret[0] ? ret[0].id : 0;
        this.dialog = true;
      });
    },
    getUserinfo() {
      userinfo().then(ret => {
        this.$store.commit("member/setUserinfo", ret);
      });
    },
    submit() {
      if (this.amount && this.selectProductId) {
        financeBalanceInto(this.selectProductId, this.amount).then(() => {
          this.dialog = false;
          this.$emit("success", {
            amount: this.amount,
            product_id: this.selectProductId
          });
        });
      }
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.loadProducts();
        this.getUserinfo();
      }
    },
    dialog(val) {
      this.$emit("input", val);
    }
  }
};
</script>
