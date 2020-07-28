<template>
  <q-page>
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label>{{ $t("balance") }}</q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ account.balance }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { financeAccount } from "../../assets/js/api";

export default {
  name: "vueName",
  data() {
    return {
      account: {}
    };
  },
  methods: {
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
