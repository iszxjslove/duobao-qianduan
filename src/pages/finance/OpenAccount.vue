<template>
  <q-page class="q-pa-lg">
    <q-form @submit="onSubmit">
      <q-card bordered flat>
        <q-card-section>
          <q-item-label class="text-center">
            {{ $t("application_protocol") }}
          </q-item-label>
        </q-card-section>
        <q-card-section v-html="ruleContent"></q-card-section>
      </q-card>

      <q-checkbox
        v-model="accept"
        color="primary"
        class="text-caption text-primary q-mb-lg"
        :label="$t('please_read_and_sign_the_agreement_carefully')"
      >
      </q-checkbox>

      <q-btn
        :loading="loading.agreement"
        class="full-width"
        size="lg"
        color="primary"
        type="submit"
        unelevated
        :label="$t('submit')"
      ></q-btn>
    </q-form>
  </q-page>
</template>

<script>
import { agreement, financeOpening } from "../../assets/js/api";

export default {
  name: "OpenAccountPage",
  data() {
    return {
      accept: false,
      ruleContent: ""
    };
  },
  computed: {
    loading() {
      return this.$store.getters["common/loadings"];
    }
  },
  methods: {
    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "warning",
          textColor: "white",
          icon: "warning",
          message: this.$t("accept_the_license")
        });
        return false;
      }
      financeOpening().then(() => {
        this.$router.replace("/page/finance/account");
      });
    }
  },
  mounted() {
    agreement("application_protocol").then(ret => {
      this.ruleContent = ret.content;
    });
  }
};
</script>
