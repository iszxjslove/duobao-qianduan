<template>
  <q-page>
    <q-form @submit="onSubmit" class="q-pa-md">
      <q-item class="q-px-none" clickable v-ripple @click="changeRedType">
        <q-item-section>
          <q-item-label>{{ redPackTypeText }}</q-item-label>
        </q-item-section>
        <q-item-section side>{{ $t("click_to_change") }}</q-item-section>
        <q-item-section side class="side-no-padding">
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-input
        v-model="form.total_money"
        type="text"
        :label="$t('total_bonus_in_red_envelope')"
        clearable
      />
      <q-input
        v-model="form.number"
        type="text"
        :label="$t('numbers_of_red_envelope')"
        clearable
      />

      <q-btn
        class="full-width q-mt-lg"
        color="primary"
        no-caps
        :label="$t('put_in')"
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
        to="/page/red-envelope-record"
        no-caps
        :label="$t('records')"
      />
    </q-form>
  </q-page>
</template>

<script>
export default {
  name: "RedEnvelope",
  data() {
    return {
      redPackTypes: {
        fixed: this.$t("fixed_red_envelope"),
        lucky: this.$t("lucky_red_envelope")
      },
      redPackTypeText: this.$t("fixed_red_envelope"),
      form: {
        type: "fixed",
        total_money: "",
        number: ""
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
    changeRedType() {
      this.form.type = this.form.type === "fixed" ? "lucky" : "fixed";
      this.redPackTypeText = this.redPackTypes[this.form.type];
    }
  }
};
</script>
