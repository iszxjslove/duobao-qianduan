<template>
  <q-page class="q-pa-md">
    <q-item class="q-mb-md">
      <q-item-section>
        <q-item-label>{{ $t("available_balance") }}</q-item-label>
      </q-item-section>
      <q-item-section side class="text-h5 text-positive">
        {{ userinfo.money | symbol }}
      </q-item-section>
    </q-item>
    <q-form @submit="onSubmit">
      <q-input
        outlined
        v-model="form.amount"
        :placeholder="$t('enter_withdraw_amount')"
        :rules="[
          val => (val && val >= min_amount) || min_amount_tip,
          val =>
            (val && parseFloat(val) <= userinfo.money) ||
            'Sorry, your credit is running low'
        ]"
      >
        <template v-slot:prepend>
          {{ $store.state.common.currency.symbol }}
        </template>
      </q-input>
      <q-item clickable v-ripple @click="selectBank">
        <q-item-section>
          <q-item-label>{{ bankCard | default("Select Bank") }}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-btn
        :label="$t('submit')"
        class="q-mt-xl full-width"
        unelevated
        size="lg"
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
      bankList: null,
      addBankDialog: false,
      bankCard: null,
      form: {
        amount: "",
        bank_id: null
      }
    };
  },
  components: {
    AddBank
  },
  methods: {
    async selectBank() {
      if (this.bankList === null) {
        this.bankList = [];
        let res = await getBankList();
        if (res && res.rows.length > 0) {
          res.rows.forEach(el => {
            this.bankList.push({
              id: el.id,
              label: el.account_number,
              icon: "credit_card"
            });
          });
        }
        this.bankList.push({});
        this.bankList.push({ id: 0, label: "Add bank" });
      }
      this.$q
        .bottomSheet({
          message: "Select Bank",
          actions: this.bankList
        })
        .onOk(action => {
          this.form.bank_id = action.id;
          if (action.id) {
            this.bankCard = action.label;
          } else {
            this.addBankDialog = true;
          }
        });
    },
    onSubmit() {
      if (!this.form.bank_id) {
        this.$q.notify({
          type: "negative",
          message: "Please select bank card"
        });
        return false;
      }
      withdrawAdd(this.form).then(ret => {
        this.$store.dispatch("member/updateUserinfo");
        this.$router.back(-1);
      });
    },
    addBankCallback() {
      this.bankList = null;
      this.selectBank();
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.member.userinfo;
    },
    loading() {
      return this.$store.getters["common/loadings"];
    },
    min_amount() {
      return parseFloat(this.$store.state.common.min_withdraw_amount);
    },
    min_amount_tip() {
      return "At least  " + this.$q.filters.symbol(this.min_amount);
    },
    real_amount() {
      if (this.form.amount && this.fee) {
        return this.form.amount - this.fee;
      }
      return this.form.amount;
    },
    fee() {
      if (this.form.amount && this.withdraw_rate) {
        let lv = 0;
        for (const key in this.withdraw_rate) {
          if (this.withdraw_rate.hasOwnProperty(key)) {
            if (Number(this.form.amount) > Number(key) && Number(key) >= lv) {
              lv = Number(key);
            }
          }
        }
        const rateStr = this.withdraw_rate[lv];
        const rate = parseFloat(rateStr);
        const ratio = rateStr.charAt(rateStr.length - 1);
        if (ratio === "%") {
          return (this.form.amount * (rate / 100)).toFixed(2);
        }
        return rate;
      }
      return 0;
    },
    withdraw_rate() {
      return this.$store.state.common.withdraw_rate;
    }
  },
  created() {
    this.$store.dispatch("member/updateUserinfo");
  }
};
</script>
