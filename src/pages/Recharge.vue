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

    <q-input
      class="q-mb-lg"
      outlined
      v-model="amount"
      :placeholder="$t('enter_or_select_recharge_amount')"
    >
      <template v-slot:prepend>
        {{ $store.state.common.currency.symbol }}
      </template>
    </q-input>

    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-4" v-for="(n, k) in amountList" :key="k">
        <q-btn
          :color="amount === n ? 'primary' : 'grey'"
          class="full-width"
          unelevated
          @click="amount = n"
          :label="n | symbol(0)"
        />
      </div>
    </div>

    <div class="q-mb-md">
      <q-radio v-model="channel" :val="8035" label="Online Bank Transfer" />
      <q-radio v-model="channel" :val="8036" label="P2A Transfer" />
    </div>
    <q-select
      v-model="bankCard"
      label="select bank"
      :options="bankList"
      @filter="getBanks"
      outlined
      class="q-mb-xl"
      v-if="channel === 8036"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            No results
          </q-item-section>
        </q-item>
      </template>
    </q-select>

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
    />
  </q-page>
</template>

<script>
import { getBankList, unifiedOrder } from "../assets/js/api";
import { openURL } from "quasar";

export default {
  name: "RechargePage",
  data() {
    return {
      amount: 0,
      amountList: [1000, 2000, 5000, 10000, 15000, 20000],
      channel: 8036,
      bankCard: null,
      bankList: null
    };
  },
  methods: {
    unifiedOrder() {
      if (this.amount > 0) {
        let params = {
          amount: this.amount,
          channel: this.channel
        };
        if (this.channel === 8036) {
          if (!this.bankCard) {
            return false;
          }
          params.bankId = this.bankCard.value;
        }
        unifiedOrder(params).then(ret => {
          if (ret && ret.payurl) {
            window.location.href = ret.payurl;
          } else {
            this.$q.notify({
              type: "warning",
              message: "refresh"
            });
          }
        });
      }
    },
    getBanks(val, update, abort) {
      if (this.bankList !== null) {
        update();
        return;
      }
      getBankList().then(ret => {
        update(() => {
          if (ret.rows.length > 0) {
            this.bankList = [];
            ret.rows.map(v => {
              this.bankList.push({ label: v.account_number, value: v.id });
            });
          }
        });
      });
    }
  },
  computed: {
    loading() {
      return this.$store.getters["common/loadings"];
    },
    userinfo() {
      return this.$store.state.member.userinfo;
    }
  }
};
</script>
