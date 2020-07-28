<template>
  <q-page>
    <q-form @submit="onSubmit" class="q-pa-md">
      <q-input
        outlined
        v-model="form.nickname"
        :label="$t('you_name')"
        :placeholder="$t('please_enter_the_new_name')"
        lazy-rules
        :rules="[
          val => (val && val.length > 0) || $t('please_enter_the_new_name')
        ]"
      />

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
  name: "ModifyNicknamePage",
  data() {
    return {
      form: {
        nickname: ""
      }
    };
  },
  methods: {
    onSubmit() {}
  }
};
</script>
