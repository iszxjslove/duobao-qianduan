<template>
  <q-page class="q-pa-md">
    <q-item class="q-mb-md">
      <q-item-section>
        <q-item-label>{{ $t("my_balance") }}</q-item-label>
      </q-item-section>
      <q-item-section side class="text-h5 text-positive">
        {{ userinfo.money | symbol }}
      </q-item-section>
    </q-item>

    <!-- paytype -->
    <div class="q-pb-sm">ReCharge Methods</div>
    <q-list separator class="q-mb-md">
      <q-item
        tag="label"
        v-ripple
        v-for="(item, index) in paytypes"
        :key="index"
      >
        <q-item-section avatar>
          <q-radio v-model="form.account_id" :val="item.id" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label
            >{{ item.fastpay.ch_name }}({{
              item.channel.channel_label
            }})</q-item-label
          >
          <q-item-label caption>{{ item.channel.desc }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        v-if="payacc.channel && payacc.channel.pay_type === 'bank'"
        @click="selectBank"
      >
        <q-item-section>
          <q-item-label>{{ bankCard | default("Select Bank") }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- amount input -->
    <q-input
      class="q-mb-lg"
      outlined
      v-model="form.amount"
      :placeholder="$t('enter_or_select_recharge_amount')"
      v-if="!payacc.amount_fixed || !payacc.amount_list"
    >
      <template v-slot:prepend>
        {{ $store.state.common.currency.symbol }}
      </template>
    </q-input>

    <!-- amount list select -->
    <div class="row q-col-gutter-md q-mb-lg" v-if="payacc.amount_list">
      <div
        class="col-4"
        v-for="(n, k) in payacc.amount_list.split(',')"
        :key="k"
      >
        <q-btn
          :color="form.amount === n ? 'primary' : 'grey'"
          class="full-width"
          unelevated
          @click="form.amount = n"
          :label="n | symbol(0)"
        />
      </div>
    </div>

    <q-btn
      :label="$t('recharge')"
      no-caps
      unelevated
      class="full-width q-mb-md"
      color="primary"
      size="lg"
      :loading="loading.unifiedOrder"
      @click="unifiedOrder"
    >
      <template v-slot:loading>
        <q-spinner-hourglass class="on-left" />
        {{ $t("loading") }}...
      </template>
    </q-btn>

    <q-btn
      :label="$t('historical_records')"
      no-caps
      unelevated
      class="full-width q-mb-md"
      color="grey"
      size="lg"
      to="/page/billing"
    />
  </q-page>
</template>

<script>
import { getBankList, getPayType, unifiedOrder } from "../assets/js/api";
import { openURL } from "quasar";

export default {
  name: "RechargePage",
  data() {
    return {
      bankCard: null,
      bankList: null,
      paytypes: [],
      form: {
        amount: 0,
        account_id: null,
        bank_id: 0
      }
    };
  },
  methods: {
    selectBank() {
      getBankList().then(res => {
        let actions = [];
        if (res.rows.length > 0) {
          res.rows.forEach(el => {
            actions.push({
              id: el.id,
              label: el.account_number,
              icon: "credit_card"
            });
          });
          this.$q
            .bottomSheet({
              message: "Select Bank",
              actions: actions
            })
            .onOk(action => {
              this.form.bank_id = action.id;
              if (action.id) {
                this.bankCard = action.label;
              } else {
                this.$router.push("/page/bank");
              }
            });
        }
        actions.push({});
        actions.push({ id: 0, label: "Add bank" });
      });
    },
    unifiedOrder() {
      if (
        this.payacc.channel.min_amount &&
        this.form.amount < this.payacc.channel.min_amount
      ) {
        this.$q.notify({
          type: "negative",
          message: "Minimum amount " + this.payacc.channel.min_amount
        });
        return false;
      }
      if (
        this.payacc.channel.max_amount &&
        this.form.amount > this.payacc.channel.max_amount
      ) {
        this.$q.notify({
          type: "negative",
          message: "Maximum amount " + this.payacc.channel.max_amount
        });
        return false;
      }

      if (this.payacc.channel.pay_type === "bank" && !this.form.bank_id) {
        this.$q.notify({
          type: "negative",
          message: "Please select bank card"
        });
        return false;
      }

      unifiedOrder(this.form).then(ret => {
        if (ret && ret.payurl) {
          window.location.href = ret.payurl;
        } else {
          this.$q.notify({
            type: "warning",
            message: "refresh"
          });
        }
      });
    },
    getPayType() {
      getPayType().then(res => {
        this.paytypes = res;
        if (res.length > 0) {
          this.form.account_id = res[0].id;
          if (res[0].amount_list) {
            this.form.amount = res[0].amount_list.split(",")[0];
          }
        }
      });
    }
  },
  computed: {
    loading() {
      return this.$store.getters["common/loadings"];
    },
    userinfo() {
      return this.$store.state.member.userinfo;
    },
    payacc() {
      let acc = {};
      this.paytypes.forEach(el => {
        if (el.id === this.form.account_id) {
          acc = el;
        }
      });
      return acc;
    }
  },
  mounted() {
    this.getPayType();
  }
};
</script>
