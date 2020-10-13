<template>
  <q-page class="bg-grey-2">
    <q-card square flat class="q-mb-md">
      <q-item class="bg-primary text-white q-py-lg" clickable v-ripple>
        <q-item-section>
          <q-item-label class="text-h6">
            {{ count.bonus | symbol }}
          </q-item-label>
          <q-item-label class="text-caption">{{ $t("my_bonus") }}</q-item-label>
        </q-item-section>
        <q-item-section side class="text-white" @click="applyToBalance">
          {{ $t("apply_tobalance") }}
        </q-item-section>
        <q-item-section
          side
          class="side-no-padding text-white"
          @click="applyToBalance"
        >
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>
      </q-item>

      <q-btn-group class="bg-white q-py-sm" unelevated stretch spread>
        <q-btn no-caps :label="$t('bonus_record')" to="/page/promotion/bonus" />
        <q-separator vertical />
        <q-btn no-caps :label="$t('apply_record')" to="/page/promotion/apply" />
      </q-btn-group>
    </q-card>

    <q-card bordered square flat class="q-mb-md">
      <q-item clickable v-ripple class="bg-white" to="/page/promotion/record">
        <q-item-section>{{ $t("promotion") }}</q-item-section>
        <q-item-section side>{{ $t("record") }}</q-item-section>
        <q-item-section side class="side-no-padding">
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-card-section>
        {{ $t("active_members_today") }}: {{ count.active_members_today }}
      </q-card-section>

      <q-tabs v-model="levelPanel" class="text-teal">
        <q-tab
          :label="$t('level') + ' ' + index"
          :name="index"
          v-for="(item, index) in count.child"
          :key="index"
        />
      </q-tabs>
      <q-separator />
      <q-tab-panels v-model="levelPanel" animated>
        <q-tab-panel
          :name="index"
          v-for="(item, index) in count.child"
          :key="index"
        >
          <q-item>
            <q-item-section>
              <q-item-label class="text-caption">
                {{ $t("total_people") }}
              </q-item-label>
              <q-item-label class="text-h6">
                {{ item.total_people }}
              </q-item-label>
            </q-item-section>
            <q-item-section>
              <q-item-label class="text-caption">
                {{ $t("contribution_rupees") }}
              </q-item-label>
              <q-item-label class="text-h6">
                {{ item.contribution | symbol }}
              </q-item-label>
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
      levelPanel: "1",
      count: {
        bonus: 0,
        active_members_today: 0,
        child: {}
      }
    };
  },
  computed: {
    currency() {
      return this.$store.state.common.currency;
    }
  },
  methods: {
    applyToBalance() {
      this.$q
        .dialog({
          title: "Confirm",
          message: "apply to balance",
          cancel: true
        })
        .onOk(() => {
          this.$apis.applyToBalance().then(() => {
            this.getPromotionCount();
          });
        });
    },
    getPromotionCount() {
      this.$apis.promotionCount().then(res => {
        this.count = res;
      });
    }
  },
  mounted() {
    this.getPromotionCount();
  }
};
</script>
