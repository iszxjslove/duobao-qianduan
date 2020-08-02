<template>
  <q-page>
    <q-form @submit="onSubmit" class="q-pa-md">
      <q-input
        v-model="password"
        type="password"
        :placeholder="$t('please_enter_the_login_password')"
        :label="$t('password')"
        :rules="[
          val => (val && val !== '') || $t('please_enter_the_login_password')
        ]"
        clearable
      >
        <template v-slot:prepend>
          <q-icon name="o_lock" />
        </template>
      </q-input>
      <q-input
        v-model="newpassword"
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
          val => (val && val === newpassword) || $t('password_confirm_failed')
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
        >
        </q-btn>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { changePassword } from "../../assets/js/api";

export default {
  name: "ModifyLoginPasswordPage",
  data() {
    return {
      confirmPassword: "",
      password: "",
      newpassword: ""
    };
  },
  methods: {
    onSubmit() {
      changePassword(this.password, this.newpassword).then(() => {
        window.history.back();
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
