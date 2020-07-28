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
        <q-tab name="given" :label="$t('given_record')" />
        <q-tab name="recevied" :label="$t('recevied_record')" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="given">
          <div class="text-grey-8 text-center">{{ $t("no_more") }}</div>
        </q-tab-panel>

        <q-tab-panel name="recevied">
          <div class="text-grey-8 text-center">{{ $t("no_more") }}</div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "RedEnvelopeRecordPage",
  data() {
    return {
      tab: "given"
    };
  }
};
</script>
