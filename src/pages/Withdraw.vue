<template>
  <q-page class="q-pa-md">
    <q-form @submit="onSubmit">
      <q-item class="q-mb-md">
        <q-item-section>
          <q-item-label>{{ $t("available_balance") }}</q-item-label>
        </q-item-section>
        <q-item-section side class="text-h5 text-positive">
          {{ userinfo.money | symbol }}
        </q-item-section>
      </q-item>

      <q-input
        class="q-mb-lg"
        outlined
        v-model="amount"
        :placeholder="$t('enter_withdraw_amount')"
      >
        <template v-slot:prepend>
          {{ $store.state.common.currency.symbol }}
        </template>
      </q-input>

      <q-item v-if="loading.getBankList">
        <q-item-section avatar>
          <q-skeleton type="QAvatar" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" width="65%" />
          </q-item-label>
        </q-item-section>
      </q-item>
      <template v-else>
        <q-select
          v-if="bankList && bankList.length > 0"
          v-model="bank"
          :label="$t('select_bank')"
          :options="bankList"
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
          v-else
          size="lg"
          unelevated
          color="info"
          class="full-width"
          :label="$t('add_bank')"
          @click="addBankDialog = true"
          no-caps
        ></q-btn>
      </template>

      <q-btn
        :label="$t('submit')"
        class="q-mt-xl full-width"
        unelevated
        size="lg"
        :disable="!amount || !bank"
        color="primary"
        no-caps
        type="submit"
      ></q-btn>
    </q-form>

    <add-bank v-model="addBankDialog" @success="addBankCallback" />
  </q-page>
</template>

<script>
import { getBankList, withdrawAdd } from "../assets/js/api";
import AddBank from "../components/AddBank.vue";

export default {
  name: "WithdrawPage",
  data() {
    return {
      amount: "",
      bank: null,
      bankList: null,
      addBankDialog: false
    };
  },
  components: {
    AddBank
  },
  methods: {
    onSubmit() {
      withdrawAdd(this.amount, this.bank.value).then(ret => {
        this.$store.commit("member/setUserinfo", ret);
        console.log(this.$q.localStorage.getItem(this.$config.key("userinfo")));
        window.history.back();
      });
    },
    addBankCallback() {
      this.getBanks();
    },
    getBanks(update) {
      getBankList().then(ret => {
        let def = false;
        this.bankList = ret.rows.map(v => {
          let op = { label: v.account_number, value: v.id };
          if (def === false || v.is_default === 1) {
            def = op;
          }
          return op;
        });
        this.bank = def;
      });
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.member.userinfo;
    },
    loading() {
      return this.$store.getters["common/loadings"];
    }
  },
  watch: {
    amount(val) {
      if (Number(val) > Number(this.userinfo.money)) {
        this.amount = this.userinfo.money;
      }
    }
  },
  created() {
    this.getBanks();
  }
};
</script>
