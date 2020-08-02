<template>
  <q-page>
    <q-img :src="pageBg" class="absolute-top" />
    <q-list>
      <q-item class="text-white q-py-lg">
        <q-item-section>
          <q-item-label>{{ userinfo.username }}</q-item-label>
        </q-item-section>
        <q-item-section avatar>
          <q-avatar>
            <q-img :src="userinfo.avatar">
              <template v-slot:error>
                <div
                  class="absolute-full flex flex-center bg-grey-3 text-grey-8 text-body2"
                >
                  Error
                </div>
              </template>
              <template v-slot:loading>
                <q-spinner-facebook color="grey-5" size="20px" />
              </template>
            </q-img>
          </q-avatar>
        </q-item-section>
      </q-item>

      <q-separator inset class=" absolute bg-transparent-white-1" />

      <q-item>
        <q-item-section>
          <q-item-label class="text-h6 text-white">{{
            $t("personal_wallet")
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <q-card class="q-mx-md bg-transparent-white-5 q-pt-md">
      <q-card-section>
        <q-item>
          <q-item-section>
            <q-item-label class="text-h4 text-white">
              {{ userinfo.money | symbol }}
            </q-item-label>
            <q-item-label>
              {{ $t("total_assets") }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label class="text-h6">
              {{ $t("cashable") }}: {{ userinfo.money | symbol }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-separator />
      <q-btn-group class="bg-transparent q-py-sm" unelevated stretch spread>
        <q-btn no-caps :label="$t('rechange')" to="/page/recharge" />
        <q-separator vertical />
        <q-btn no-caps :label="$t('withdrawal')" to="/page/withdraw" />
      </q-btn-group>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "WalletPage",
  computed: {
    pageBg() {
      return this.$store.state.common.background.wallet.url;
    },
    userinfo() {
      return this.$store.state.member.userinfo;
    }
  }
};
</script>
