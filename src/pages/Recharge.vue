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

    <div class="row q-col-gutter-md q-mb-xl">
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
import { unifiedOrder } from "../assets/js/api";
import { openURL } from "quasar";

export default {
  name: "RechargePage",
  data() {
    return {
      amount: "",
      amountList: [1000, 2000, 5000, 10000, 15000, 20000]
    };
  },
  methods: {
    unifiedOrder() {
      if (this.amount > 0) {
        unifiedOrder(this.amount).then(ret => {
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
