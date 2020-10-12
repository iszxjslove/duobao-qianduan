<template>
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
          clearable
          :prefix="'+' + form.prefix"
        >
          <template v-slot:prepend>
            <q-icon name="phone_android" />
          </template>
        </q-input>

        <q-input
          v-model="form.password"
          type="password"
          :rules="[passwordRule]"
          :placeholder="$t('create_password')"
          :label="$t('password')"
          clearable
        >
          <template v-slot:prepend>
            <q-icon name="o_lock" />
          </template>
        </q-input>
        <q-input
          v-model="confirmPassword"
          type="password"
          :placeholder="$t('confirm_password')"
          :label="$t('confirm_password')"
          :rules="[
            val =>
              (val && val === form.password) || $t('password_confirm_failed')
          ]"
          clearable
        >
          <template v-slot:prepend>
            <q-icon name="check" />
          </template>
        </q-input>

        <!-- verification_code -->
        <q-input
          v-model="form.code"
          :placeholder="$t('verification_code')"
          :label="$t('code')"
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

        <!-- recommendation_code -->
        <q-input
          v-model="form.referrer"
          type="text"
          :placeholder="$t('recommendation_code')"
          :label="$t('referrer')"
          clearable
          :rules="[
            val =>
              (val && val.length > 0) ||
              $t('field_required', { field: 'referrer' })
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="o_admin_panel_settings" />
          </template>
        </q-input>

        <!-- accept_the_license -->
        <q-checkbox
          v-model="accept"
          color="primary"
          :label="$t('i_agree_with_the')"
        >
          <span @click.stop="fixed = true" class="text-primary cursor-pointer">
            {{ $t("privacy_policy") }}
          </span>
        </q-checkbox>

        <!-- submit -->
        <q-btn
          class="full-width q-mt-lg"
          color="primary"
          no-caps
          :label="$t('register')"
          size="lg"
          unelevated
          type="submit"
          :loading="loading.register"
        >
          <template v-slot:loading>
            <q-spinner-hourglass class="on-left" />
            {{ $t("loading") }}...
          </template>
        </q-btn>

        <!-- go back -->
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
    <!-- 注册协议 -->
    <agreement-dialog
      v-model="fixed"
      :confirm-label="$t('accept')"
      :cancel-label="$t('decline')"
      :sub-title="subTitle"
      :title="$t('terms_of_agreement')"
      :content="agreement"
      @confirm="agreementConfirm"
    />
  </q-page>
</template>

<script>
import { agreement, register, smsSend } from "../assets/js/api";

export default {
  name: "RegisterPage",
  data() {
    return {
      accept: true,
      fixed: false,
      agreement: "",
      subTitle: "",
      confirmPassword: "",
      sending: false,
      codeTimeout: 59,
      form: {
        mobile: "",
        password: "",
        code: "",
        referrer: "",
        prefix: this.$store.state.common.prefix
      }
    };
  },
  computed: {
    loading() {
      return this.$store.getters["common/loadings"];
    }
  },
  methods: {
    agreementConfirm(confirm) {
      this.accept = confirm;
    },
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
    onSubmit() {
      if (!this.form.code) {
        this.$q.notify({
          color: "warning",
          textColor: "white",
          icon: "warning",
          message: this.$t("enter_correct_code")
        });
        return false;
      }

      if (this.accept !== true) {
        this.$q.notify({
          color: "warning",
          textColor: "white",
          icon: "warning",
          message: this.$t("accept_the_license")
        });
        return false;
      }
      register(this.form)
        .then(data => {
          if (data) {
            this.$store.commit("member/login", data.userinfo);
            this.$router.replace({
              path: this.$route.query.redirect || "/"
            });
          }
        })
        .catch(res => {
          if (res.code === 201) {
            this.$q
              .dialog({
                title: "Confirm",
                message: this.$t("invalid_referral_code_continue"),
                cancel: true,
                persistent: true
              })
              .onOk(() => {
                this.form.referrer = "";
                this.onSubmit();
              });
          }
        });
    }
  },
  async created() {
    let agree = await agreement("register");
    this.agreement = agree.content;
    this.subTitle = agree.subtitle;
    this.form.referrer = this.$q.localStorage.getItem(
      this.$config.key("referrer")
    );
  }
};
</script>
