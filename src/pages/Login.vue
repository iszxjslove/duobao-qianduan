<template>
  <q-page>
    <div class="q-gutter-y-sm q-px-xl">
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
          v-model="form.password"
          type="password"
          :rules="[passwordRule]"
          :placeholder="$t('create_password')"
          :label="$t('password')"
        >
          <template v-slot:prepend>
            <q-icon name="o_lock" />
          </template>
          <template v-if="form.password" v-slot:append>
            <q-icon
              name="cancel"
              @click.stop="form.password = ''"
              class="cursor-pointer"
            />
          </template>
        </q-input>

        <div class="text-right">
          <router-link to="/forget">{{ $t("forget_password") }}</router-link>
        </div>

        <q-btn
          class="full-width q-mt-lg"
          color="primary"
          no-caps
          :label="$t('sign_in')"
          size="lg"
          unelevated
          type="submit"
          :loading="loading.login"
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
</template>

<script>
import { login } from "../assets/js/api";

export default {
  name: "LoginPage",
  data() {
    return {
      autoLogin: true,
      form: {
        mobile: "",
        password: ""
      }
    };
  },
  computed: {
    loading() {
      return this.$store.getters["common/loadings"];
    }
  },
  methods: {
    onSubmit() {
      login(this.form).then(data => {
        if (data) {
          data.userinfo.auto = this.autoLogin;
          this.$q.sessionStorage.set(
            this.$config.key("test_gruop"),
            data.userinfo.test
          );
          this.$q.sessionStorage.set(this.$config.key("game_limit_time"), -1);
          this.$store.commit("member/login", data.userinfo);
          this.$router.replace({
            path: this.$route.query.redirect || "/"
          });
        }
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
