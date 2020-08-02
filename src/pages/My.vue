<template>
  <q-page class="bg-grey-2">
    <q-card flat square>
      <q-img :src="headerBg" :ratio="16 / 7">
        <q-item class="full-width bg-transparent" style="padding-top:24px">
          <q-item-section avatar>
            <q-avatar size="xl">
              <q-img :src="userinfo.avatar" :ratio="1" class="bg-grey-1">
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
          <q-item-section @click.stop="copyCode">
            <q-item-label>
              {{ userinfo.nickname || userinfo.mobile }}
            </q-item-label>
            <q-item-label>
              <span class="text-caption">{{ $t("code") }}:</span>
              <span class="text-body2">{{ userinfo.referrer }}</span>
            </q-item-label>
          </q-item-section>

          <q-item-section avatar>
            <q-btn color="white" flat icon="o_settings" to="/page/account" />
          </q-item-section>
        </q-item>

        <q-btn-group flat class="absolute-bottom bg-transparent">
          <q-btn flat no-caps to="/page/wallet">
            <div class="text-h6">
              {{ userinfo.money | symbol }}
            </div>
            <div>{{ $t("available_balance") }}</div>
          </q-btn>
          <q-btn flat no-caps to="/page/finance/account">
            <div class="text-h6">
              {{ userinfo.financial_money | symbol }}
            </div>
            <div>{{ $t("kubera_finance") }}</div>
          </q-btn>
        </q-btn-group>
      </q-img>
      <q-item clickable v-ripple class="bg-white" to="/page/orders">
        <q-item-section>{{ $t("my_orders") }}</q-item-section>
        <q-item-section side>{{ $t("more") }}</q-item-section>
        <q-item-section side class="side-no-padding">
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>
      </q-item>

      <q-separator inset />

      <q-btn-group flat class="bg-white q-py-sm">
        <q-btn no-caps to="/page/orders?tab=undeliver">
          <q-icon name="o_account_balance_wallet" size="md"></q-icon>
          <div>{{ $t("undeliver") }}</div>
        </q-btn>
        <q-btn no-caps to="/page/orders?tab=un_receive">
          <q-icon name="bike_scooter" size="md"></q-icon>
          <div>{{ $t("un_receive") }}</div>
        </q-btn>
        <q-btn no-caps to="/page/orders?tab=success">
          <q-icon name="addchart" size="md"></q-icon>
          <div>{{ $t("refund") }}</div>
        </q-btn>
        <q-btn no-caps to="/page/orders?tab=all">
          <q-icon name="wysiwyg" size="md"></q-icon>
          <div>{{ $t("all_orders") }}</div>
        </q-btn>
      </q-btn-group>
    </q-card>

    <q-separator />
    <q-list class="bg-white q-mt-md" separator>
      <!-- <q-item clickable v-ripple to="/page/red-envelope">
        <q-item-section>{{ $t("red_envelope") }}</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>
      </q-item> -->
      <q-item clickable v-ripple to="/page/mission">
        <q-item-section>{{ $t("mission_center") }}</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/page/promotion">
        <q-item-section>{{ $t("my_promotion") }}</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/page/wallet">
        <q-item-section>{{ $t("my_wallet") }}</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/page/bank">
        <q-item-section>{{ $t("my_bank") }}</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/page/billing">
        <q-item-section>{{ $t("billing_details") }}</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/page/account">
        <q-item-section>{{ $t("account_security") }}</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/page/about">
        <q-item-section>{{ $t("about_us") }}</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple to="/page/complaint">
        <q-item-section>{{ $t("complaints_suggestions") }}</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>
      </q-item>
      <q-item clickable v-ripple @click="logout">
        <q-item-section>Sign out</q-item-section>
        <q-item-section side>
          <q-icon name="keyboard_arrow_right"></q-icon>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import { SessionStorage } from "quasar";
import Config from "../assets/js/config";
import { webcome, userinfo } from "../assets/js/api";
import { copyToClipboard } from "quasar";

export default {
  name: "MyPage",
  preFetch({ store, redirect, currentRoute }) {
    store.commit("member/autoToken");
    store.commit("member/setUserinfo");
    if (
      !SessionStorage.getItem(Config.key("auth")) &&
      currentRoute.path !== "/login"
    ) {
      redirect("/login");
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.member.userinfo;
    },
    headerBg() {
      return this.$store.state.common.headerBg;
    },
    currency() {
      return this.$store.state.common.currency;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("member/logoutAction").then(() => {
        this.$router.push("/login");
      });
    },
    copyCode() {
      copyToClipboard(this.userinfo.referror)
        .then(() => {
          this.$toastr.success(
            this.$t("copy_success", { text: this.$t("code") })
          );
        })
        .catch(() => {
          this.$toastr.warning(
            this.$t("copy_error", { text: this.$t("code") })
          );
        });
    }
  },
  created() {
    userinfo().then(ret => {
      this.$store.commit("member/setUserinfo", ret);
    });
  }
};
</script>
