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
          <q-input
            v-model="form.actual_name"
            :label="$t('Actual name')"
            :rules="[val => !!val || $t('Please enter the actual name')]"
            :placeholder="$t('Please enter the actual name')"
          />
          <q-input
            v-model="form.ifsc_code"
            :label="$t('IFSC code')"
            :rules="[val => !!val || $t('Please enter the IFSC code')]"
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
            :rules="[val => !!val || $t('Please enter the State')]"
            :placeholder="$t('Please enter the State')"
          />
          <q-input
            v-model="form.city"
            :label="$t('city')"
            :rules="[val => !!val || $t('Please enter the city')]"
            :placeholder="$t('Please enter the city')"
          />
          <q-input
            v-model="form.address"
            :label="$t('address')"
            :rules="[val => !!val || $t('Please enter the address')]"
            :placeholder="$t('Please enter the address')"
          />
          <q-input
            v-model="form.mobile_number"
            :label="$t('Mobile number')"
            :rules="[val => !!val || $t('Please enter the mobile number')]"
            :placeholder="$t('Please enter the mobile number')"
          />
          <q-input
            v-model="form.email"
            :label="$t('email')"
            :rules="[val => !!val || $t('Please enter the email')]"
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
      form: {}
    };
  },
  computed: {
    loading() {
      return this.$store.getters["common/loadings"];
    }
  },
  methods: {
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
