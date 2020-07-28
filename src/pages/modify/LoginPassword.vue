<template>
  <q-page>
    <q-form @submit="onSubmit" class="q-pa-md">
      <q-input
        v-model="form.oldPassword"
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
  </q-page>
</template>

<script>
export default {
  name: "ModifyLoginPasswordPage",
  data() {
    return {
      confirmPassword: "",
      form: {
        oldPassword: "",
        newPassword: ""
      }
    };
  },
  methods: {
    onSubmit() {},
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
