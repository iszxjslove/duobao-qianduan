<template>
  <q-layout view="hHh lpR fFf">
    <q-header>
      <q-toolbar class="bg-white q-pt-xl q-pb-md text-grey-8 text-center">
        <q-toolbar-title>{{ $t("forget_password") }}</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <div class="q-px-xl">
          <q-form @submit="onSubmit">
            <q-input
              v-model="form.mobile"
              :placeholder="$t('registered_mobile_number')"
              :label="$t('mobile')"
              :rules="[
                val => (val && val.length > 0) || $t('enter_correct_mobile')
              ]"
              lazy-rules
              ref="mobile"
            >
              <template v-slot:prepend>
                <q-icon name="phone_android" />
              </template>
              <template v-if="form.mobile" v-slot:append>
                <q-icon
                  name="cancel"
                  @click.stop="form.mobile = ''"
                  class="cursor-pointer"
                />
              </template>
            </q-input>

            <q-input
              v-model="form.newpassword"
              type="password"
              :rules="[passwordRule]"
              :placeholder="$t('create_password')"
              :label="$t('password')"
            >
              <template v-slot:prepend>
                <q-icon name="o_lock" />
              </template>
              <template v-if="form.newpassword" v-slot:append>
                <q-icon
                  name="cancel"
                  @click.stop="form.newpassword = ''"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
            <q-input
              v-model="confirmPassword"
              type="password"
              :placeholder="$t('confirm_password')"
              :label="$t('confirm_password')"
              :rules="[
                val =>
                  (val && val === form.newpassword) ||
                  $t('password_confirm_failed')
              ]"
            >
              <template v-slot:prepend>
                <q-icon name="check" />
              </template>
              <template v-if="form.confirmPassword" v-slot:append>
                <q-icon
                  name="cancel"
                  @click.stop="form.confirmPassword = ''"
                  class="cursor-pointer"
                />
              </template>
            </q-input>

            <q-input
              v-model="form.captcha"
              :placeholder="$t('verification_code')"
              :label="$t('verification_code')"
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
                    {{ $t("sending") }}...<q-spinner
                      size="xs"
                      class="on-right"
                    />
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
            <q-btn
              unelevated
              size="lg"
              class="full-width q-mt-lg"
              color="primary"
              no-caps
              :label="$t('continue')"
              type="submit"
              :loading="loading.forget"
            >
              <template v-slot:loading>
                <q-spinner-hourglass class="on-left" />
                {{ $t("loading") }}...
              </template>
            </q-btn>
            <q-btn
              unelevated
              size="lg"
              class="full-width q-mt-lg"
              color="grey"
              to="/"
              no-caps
              :label="$t('back_home')"
            />
          </q-form>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { forget, smsSend } from "../assets/js/api";

export default {
  name: "ForgetPage",
  data() {
    return {
      confirmPassword: "",
      sending: false,
      codeTimeout: 59,
      form: {
        type: "mobile",
        mobile: "",
        newpassword: "",
        captcha: ""
      }
    };
  },
  computed: {
    loading() {
      return this.$store.getters["common/loadings"];
    }
  },
  methods: {
    passwordRule(val) {
      const min = 6,
        max = 32;
      if (!val || val.length < min || val.length > max) {
        return this.$t("login_password_rule", { min, max });
      }
      return true;
    },
    sendCode() {
      this.$refs.mobile.validate();
      if (this.$refs.mobile.hasError) {
        return false;
      }
      if (!this.tmpTime) {
        this.tmpTime = this.codeTimeout;
      }
      smsSend(this.form.mobile, "resetpwd").then(ret => {
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
    onSubmit() {
      if (!this.form.captcha) {
        this.$q.notify({
          color: "warning",
          textColor: "white",
          icon: "warning",
          message: this.$t("enter_correct_code")
        });
        return false;
      }
      forget(this.form).then(() => {
        this.$router.replace({
          path: "/login"
        });
      });
    }
  }
};
</script>
