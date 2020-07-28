<template>
  <q-page>
    <div>
      <q-tabs
        v-model="tab"
        align="justify"
        active-color="primary"
        indicator-color="primary"
        no-caps
      >
        <q-tab name="all" :label="$t('all')" />
        <q-tab name="undeliver" :label="$t('undeliver')" />
        <q-tab name="un_receive" :label="$t('un_receive')" />
        <q-tab name="success" :label="$t('success')" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="all">
          <div class="text-grey-8 text-center">{{ $t("no_more") }}</div>
        </q-tab-panel>

        <q-tab-panel name="undeliver">
          <div class="text-grey-8 text-center">{{ $t("no_more") }}</div>
        </q-tab-panel>

        <q-tab-panel name="un_receive">
          <div class="text-grey-8 text-center">{{ $t("no_more") }}</div>
        </q-tab-panel>

        <q-tab-panel name="success">
          <div class="text-grey-8 text-center">{{ $t("no_more") }}</div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "OrdersPage",
  data() {
    return {
      tab: "all"
    };
  },
  created() {
    if (this.$route.query.tab) {
      this.tab = this.$route.query.tab;
    }
  }
};
</script>
