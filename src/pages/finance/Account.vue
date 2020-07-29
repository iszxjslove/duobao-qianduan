<template>
  <q-page class="q-pa-md">
    <q-list class="q-mb-md">
      <q-item>
        <q-item-section>
          <q-item-label>{{ $t("balance") }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>{{ account.balance | symbol }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>{{ $t("interest") }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label>{{ account.interest | symbol }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-btn
      label="转入余额宝"
      class="full-width q-mx-md"
      color="primary"
      size="lg"
      unelevated
      :loading="loading.financeProducts"
      @click="loadProducts"
    >
      <template v-slot:loading>
        <q-spinner />
      </template>
    </q-btn>

    <finance-products v-model="transferDialog" @success="getAccount" />
  </q-page>
</template>

<script>
import { financeAccount } from "../../assets/js/api";
import FinanceProducts from "../../components/FinanceProducts";

export default {
  name: "vueName",
  components: {
    FinanceProducts
  },
  data() {
    return {
      account: {},
      transferDialog: false
    };
  },
  computed: {
    loading() {
      return this.$store.getters["common/loadings"];
    }
  },
  methods: {
    loadProducts() {
      this.transferDialog = true;
    },
    getAccount() {
      financeAccount().then(ret => {
        if (!ret) {
          this.$router.replace("/page/finance/open_account");
        } else {
          this.account = ret;
        }
      });
    }
  },
  created() {
    this.getAccount();
  }
};
</script>
