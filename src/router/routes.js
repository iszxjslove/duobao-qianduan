import { SessionStorage, LocalStorage } from "quasar";
import Config from "assets/js/config";

const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", redirect: "home" },
      { path: "home", component: () => import("pages/Home.vue") },
      { path: "search", component: () => import("pages/Search.vue") },
      {
        path: "game",
        component: () => {
          let time = SessionStorage.getItem(Config.key("game_limit_time"));
          let userinfo = LocalStorage.getItem(Config.key("userinfo"));
          if (
            userinfo.test &&
            time + Config.options.game_limit_time <= Date.now()
          ) {
            return import("pages/Search.vue");
          }
          return import("pages/Game.vue");
        }
      },
      { path: "my", component: () => import("pages/My.vue") }
    ]
  },
  {
    path: "/",
    component: () => import("layouts/LoginLayout.vue"),
    children: [
      { path: "login", component: () => import("pages/Login.vue") },
      { path: "register", component: () => import("pages/Register.vue") }
    ]
  },
  {
    path: "/page",
    component: () => import("layouts/PageLayout.vue"),
    children: [
      {
        path: "finance",
        component: () => import("layouts/EmptyLayout.vue"),
        children: [
          {
            path: "account",
            component: () => import("pages/finance/Account.vue"),
            meta: { title: "kubera_finance" }
          },
          {
            path: "open_account",
            component: () => import("pages/finance/OpenAccount.vue"),
            meta: { title: "kubera_finance" }
          }
        ]
      },
      {
        path: "recharge",
        component: () => import("pages/Recharge.vue"),
        meta: { title: "recharge" }
      },
      {
        path: "withdraw",
        component: () => import("pages/Withdraw.vue"),
        meta: { title: "withdraw" }
      },
      {
        path: "promotion",
        component: () => import("layouts/EmptyLayout.vue"),
        children: [
          {
            path: "",
            component: () => import("pages/Promotion.vue"),
            meta: { title: "my_promotion" }
          },
          {
            path: "bonus",
            component: () => import("pages/BonusRecord.vue"),
            meta: { title: "bonus_record" }
          },
          {
            path: "apply",
            component: () => import("pages/BonusApplyRecord.vue"),
            meta: { title: "apply_record" }
          },
          {
            path: "record",
            component: () => import("pages/PromotionRecord.vue"),
            meta: { title: "promotion_record" }
          }
        ]
      },
      {
        path: "share",
        component: () => import("pages/Share.vue"),
        meta: { title: "invite_friends" }
      },
      {
        path: "wallet",
        component: () => import("pages/Wallet.vue"),
        meta: { title: "my_wallet" }
      },
      {
        path: "bank",
        component: () => import("pages/Bank.vue"),
        meta: { title: "my_bank" }
      },
      {
        path: "billing",
        component: () => import("pages/Billing.vue"),
        meta: { title: "billing_details" }
      },
      {
        path: "account",
        component: () => import("pages/Account.vue"),
        meta: { title: "account_security" }
      },
      {
        path: "game/record",
        component: () => import("pages/game/Record.vue"),
        meta: { title: "issue_record" }
      },
      {
        path: "game/projects",
        component: () => import("pages/game/Projects.vue"),
        meta: { title: "my_orders" }
      },
      {
        path: "modify",
        component: () => import("layouts/EmptyLayout.vue"),
        children: [
          {
            path: "nickname",
            component: () => import("pages/modify/Nickname.vue"),
            meta: { title: "modify_the_name" }
          },
          {
            path: "loginpass",
            component: () => import("pages/modify/LoginPassword.vue"),
            meta: { title: "modify_login_pass" }
          },
          {
            path: "paymentpass",
            component: () => import("pages/modify/PaymentPassword.vue"),
            meta: { title: "modify_payment_password" }
          }
        ]
      },
      {
        path: "about",
        component: () => import("pages/About.vue"),
        meta: { title: "about_us" }
      },
      {
        path: "complaint",
        component: () => import("pages/Complaint.vue"),
        meta: { title: "complaints_suggestions" }
      },
      {
        path: "envelopes",
        component: () => import("layouts/EmptyLayout.vue"),
        children: [
          {
            path: "open",
            component: () => import("pages/envelopes/Open.vue"),
            meta: { title: "open_red_envelope" }
          }
        ]
      },
      {
        path: "mission",
        component: () => import("pages/Mission.vue"),
        meta: { title: "mission_center" }
      },
      {
        path: "red-envelope",
        component: () => import("pages/RedEnvelope.vue"),
        meta: { title: "red_envelope" }
      },
      {
        path: "red-envelope-record",
        component: () => import("pages/RedEnvelopeRecord.vue"),
        meta: { title: "red_envelope" }
      },
      {
        path: "orders",
        component: () => import("pages/Orders.vue"),
        meta: { title: "my_orders" }
      }
    ]
  },
  {
    path: "/goods",
    component: () => import("layouts/EmptyLayout.vue"),
    children: [
      { path: "", redirect: "details" },
      { path: "details", component: () => import("pages/GoodsDetails") }
    ]
  },
  { path: "/forget", component: () => import("pages/Forget.vue") },
  { path: "*", component: () => import("pages/Error404.vue") }
];

export default routes;
