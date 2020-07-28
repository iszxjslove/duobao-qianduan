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
        <q-tab name="waiting" :label="$t('waiting_order')" />
        <q-tab name="historical" :label="$t('historical_order')" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="waiting" class="q-px-none">
          <waiting-list />
        </q-tab-panel>

        <q-tab-panel name="historical" class="q-px-none">
          <historical-list />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script>
import HistoricalList from "../../components/projects/Historical";
import WaitingList from "../../components/projects/Waiting";

export default {
  name: "GameProjectsPage",
  components: {
    HistoricalList,
    WaitingList
  },
  data() {
    return {
      tab: "historical"
    };
  }
};
</script>
