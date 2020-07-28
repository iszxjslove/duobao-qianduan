<template>
  <q-page class="bg-grey-2">
    <q-card square flat class="q-mb-md">
      <q-item class="bg-primary text-white q-py-lg" clickable v-ripple>
        <q-item-section>
          <q-item-label class="text-h6">{{ 1231.11 | symbol }}</q-item-label>
          <q-item-label class="text-caption">{{ $t("my_bonus") }}</q-item-label>
        </q-item-section>
        <q-item-section side class="text-white">
          {{ $t("apply_tobalance") }}
        </q-item-section>
        <q-item-section side class="side-no-padding text-white">
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>
      </q-item>

      <q-btn-group class="bg-white q-py-sm" unelevated stretch spread>
        <q-btn no-caps :label="$t('bonus_record')" />
        <q-separator vertical />
        <q-btn no-caps :label="$t('apply_record')" />
      </q-btn-group>
    </q-card>

    <q-card bordered square flat class="q-mb-md">
      <q-item clickable v-ripple class="bg-white">
        <q-item-section>{{ $t("promotion") }}</q-item-section>
        <q-item-section side>{{ $t("record") }}</q-item-section>
        <q-item-section side class="side-no-padding">
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-card-section> {{ $t("active_members_today") }}: 0 </q-card-section>

      <q-tabs v-model="levelPanel" class="text-teal">
        <q-tab :label="$t('level') + ' 1'" :name="1" />
        <q-tab :label="$t('level') + ' 2'" :name="2" />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="levelPanel" animated>
        <q-tab-panel :name="1">
          <q-item>
            <q-item-section>
              <q-item-label class="text-caption">
                {{ $t("total_people") }}
              </q-item-label>
              <q-item-label class="text-h6">0</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-caption">
                {{ $t("contribution_rupees") }}
              </q-item-label>
              <q-item-label class="text-h6">{{ 0 | symbol }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-tab-panel>
        <q-tab-panel :name="2">
          <q-item>
            <q-item-section>
              <q-item-label class="text-caption">
                {{ $t("total_people") }}
              </q-item-label>
              <q-item-label class="text-h6">0</q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-caption">
                {{ $t("contribution_rupees") }}
              </q-item-label>
              <q-item-label class="text-h6">{{ 0 | symbol }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <q-item class="bg-white" clickable v-ripple to="/page/share">
      <q-item-section>{{ $t("invite_friends") }}</q-item-section>
      <q-item-section side>{{ $t("go_now") }}</q-item-section>
      <q-item-section side class="side-no-padding">
        <q-icon name="keyboard_arrow_right"></q-icon>
      </q-item-section>
    </q-item>
  </q-page>
</template>

<script>
export default {
  name: "PromotionPage",
  data() {
    return {
      levelPanel: 1
    };
  },
  computed: {
    currency() {
      return this.$store.state.common.currency;
    }
  }
};
</script>
