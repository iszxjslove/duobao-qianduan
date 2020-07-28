<template>
  <q-page>
    <q-form @submit="onSubmit" class="q-pa-md">
      <q-input
        v-model="form.code"
        :placeholder="$t('verification_code')"
        :label="$t('code')"
        :rules="[val => (val && val.length > 0) || $t('captcha_must')]"
      >
        <template v-slot:prepend>
          <q-icon name="o_insert_comment" />
        </template>
        <template v-slot:append>
          <q-btn
            unelevated
            dense
            class="q-px-sm"
            color="primary"
            :style="{ width: loading.smsSend ? '110px' : '50px' }"
            @click.stop="sendCode"
            v-if="!sending"
            :label="$t('OTP')"
            :disable="loading.smsSend"
            :loading="loading.smsSend"
          >
            <template v-slot:loading>
              {{ $t("sending") }}...<q-spinner size="xs" class="on-right" />
            </template>
          </q-btn>
          <span
            class="cursor-not-allowed text-body1 text-grey-5"
            v-if="sending"
          >
            {{ $t("try_again_seconds", { seconds: codeTimeout }) }}
          </span>
        </template>
      </q-input>

      <q-input
        v-model="form.newPassword"
        type="password"
        :rules="[passwordRule]"
        :placeholder="$t('please_enter_the_new_name')"
        :label="$t('new_password')"
        clearable
      >
        <template v-slot:prepend>
          <q-icon name="o_lock" />
        </template>
      </q-input>
      <q-input
        v-model="confirmPassword"
        type="password"
        :placeholder="$t('please_enter_the_confirm_password')"
        :label="$t('confirm_password')"
        :rules="[
          val =>
            (val && val === form.newPassword) || $t('password_confirm_failed')
        ]"
        clearable
      >
        <template v-slot:prepend>
          <q-icon name="check" />
        </template>
      </q-input>

      <div class="q-mt-md">
        <q-btn
          unelevated
          :label="$t('submit')"
          type="submit"
          class="full-width"
          size="lg"
          color="primary"
        />
      </div>
    </q-form>

    <div class="q-pa-md">{{ $t("payment_password_tip") }}</div>
  </q-page>
</template>

<script>
export default {
  name: "ModifyPaymentPasswordPage",
  data() {
    return {
      confirmPassword: "",
      form: {
        oldPassword: "",
        newPassword: "",
        code: ""
      }
    };
  },
  computed: {
    loading() {
      return this.$store.getters["common/loadings"];
    }
  },
  methods: {
    onSubmit() {},
    sendCode() {
      this.$refs.mobile.validate();
      if (this.$refs.mobile.hasError) {
        return false;
      }
      if (!this.tmpTime) {
        this.tmpTime = this.codeTimeout;
      }
      smsSend(this.form.mobile, "register").then(ret => {
        this.sending = true;
        const interval = setInterval(() => {
          if (this.codeTimeout > 0) {
            this.codeTimeout--;
            return;
          }
          this.codeTimeout = this.tmpTime;
          this.sending = false;
          clearInterval(interval);
        }, 1000);
      });
    },
    passwordRule(val) {
      const min = 6,
        max = 32;
      if (!val || val.length < min || val.length > max) {
        return this.$t("login_password_rule", { min, max });
      }
      return true;
    }
  }
};
</script>
