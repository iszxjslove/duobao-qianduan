<template>
  <q-dialog
    v-model="dialog"
    :maximized="true"
    transition-show="slide-left"
    transition-hide="slide-right"
  >
    <q-card class="bg-witer">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ $t("my_bank_card") }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit">
          <q-item clickable v-ripple @click="selectBank" class="q-px-none">
            <q-item-section>
              <q-item-label
                >{{ form.bank_code | default("Select Bank") }}</q-item-label
              >
            </q-item-section>
            <q-item-section side>
              <q-icon name="keyboard_arrow_right"></q-icon>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-input
            v-model="form.actual_name"
            :label="$t('Actual name')"
            :rules="[val => !!val || $t('Please enter the actual name')]"
            :placeholder="$t('Please enter the actual name')"
          />
          <q-input
            v-model="form.ifsc_code"
            :label="$t('IFSC code')"
            :placeholder="$t('Please enter the IFSC code')"
          />
          <q-input
            v-model="form.account_number"
            :label="$t('Account number')"
            :rules="[
              val => !!val || $t('Please enter your bank account number')
            ]"
            :placeholder="$t('Please enter your bank account number')"
          />
          <q-input
            v-model="confirm_number"
            :label="$t('Confirm number')"
            :rules="[
              val => !!val || $t('Please Re-Enter your bank account number'),
              val =>
                (!!val && val === form.account_number) ||
                $t('The two inputs are different')
            ]"
            :placeholder="$t('Please Re-Enter your bank account number')"
          />
          <q-input
            v-model="form.country"
            :label="$t('country')"
            :placeholder="$t('Please enter the State')"
          />
          <q-input
            v-model="form.city"
            :label="$t('city')"
            :placeholder="$t('Please enter the city')"
          />
          <q-input
            v-model="form.address"
            :label="$t('address')"
            :placeholder="$t('Please enter the address')"
          />
          <q-input
            v-model="form.mobile_number"
            :label="$t('Mobile number')"
            :placeholder="$t('Please enter the mobile number')"
          />
          <q-input
            v-model="form.email"
            :label="$t('email')"
            :placeholder="$t('Please enter the email')"
          />
          <q-input
            v-model="form.payment_password"
            :label="$t('payment_password')"
            :rules="[val => !!val || $t('Please enter the payment password')]"
            :placeholder="$t('Please enter the payment password')"
          />
          <q-btn
            type="submit"
            :label="$t('submit')"
            unelevated
            no-caps
            class="full-width q-my-lg"
            color="primary"
            size="lg"
            :loading="loading.addBank"
          >
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left" />
              {{ $t("loading") }}...
            </template>
          </q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { addBank } from "../assets/js/api";

export default {
  name: "AddBankDialog",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false,
      confirm_number: "",
      form: {
        bank_code: ""
      }
    };
  },
  computed: {
    loading() {
      return this.$store.getters["common/loadings"];
    }
  },
  methods: {
    selectBank() {
      const list = {
        YP_AXIS: "Axis Bank",
        YP_INDNB: "Indian Bank",
        YP_SBIN: "State Bank of India",
        YP_KOTBK: "Kotak Mahindra Bank",
        YP_CANBK: "Canara Bank",
        YP_ICICI: "ICICI Bank",
        YP_PNJB: "Punjab National Bank",
        YP_BOIN: "Bank of India",
        YP_IDBI: "IDBI Bank",
        YP_SCTRD: "Standard Chartered Bank",
        YP_KARBK: "Karnataka Bank",
        YP_HDFC: "HDFC Bank",
        YP_YESB: "Yes Bank",
        YP_CBOI: "Central Bank of India",
        YP_UNBOI: "Union Bank of India",
        YP_BRDA: "Bank of Baroda"
      };
      let actions = [];
      for (const key in list) {
        if (list.hasOwnProperty(key)) {
          actions.push({
            id: key,
            label: key + " (" + list[key] + ")",
            icon: "credit_card"
          });
        }
      }

      this.$q
        .bottomSheet({
          message: "Select Bank",
          actions: actions
        })
        .onOk(action => {
          this.form.bank_code = action.id;
        });
    },
    onSubmit() {
      addBank(this.form).then(ret => {
        this.dialog = false;
        this.$emit("success", this.form);
      });
    }
  },
  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      this.$emit("input", val);
    }
  }
};
</script>
