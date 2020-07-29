<template>
  <q-page class="bg-grey-3">
    <q-card flat square>
      <q-img :src="headerBg" :ratio="16 / 6">
        <q-item class="full-width bg-transparent" style="padding-top:24px">
          <q-item-section @click="cleartime">
            <q-item-label>{{ $t("available_balance") }}</q-item-label>
            <q-item-label class="text-h5">
              {{ userinfo.money | symbol }}
            </q-item-label>
          </q-item-section>
          <!-- <q-item-section side class="text-white">Rechange</q-item-section>
          <q-item-section side class="side-no-padding text-white">
            <q-icon name="keyboard_arrow_right"></q-icon>
          </q-item-section> -->
          <q-item-section side>
            <q-btn color="white" text-color="black" unelevated no-caps>
              {{ $t("rechange") }}
              <q-icon name="keyboard_arrow_right" />
            </q-btn>
          </q-item-section>
        </q-item>

        <q-item class="absolute-bottom bg-transparent text-white">
          <q-item-section>{{ userinfo.referrer }}</q-item-section>
          <q-item-section side>
            <q-btn
              class="text-white"
              text-color="white"
              :label="$t('rule')"
              unelevated
              icon="article"
              outline
              no-caps
              @click="ruleDialog = true"
            />
          </q-item-section>
        </q-item>
      </q-img>
      <q-item class="q-py-lg">
        <q-item-section side>
          <q-item-label>{{ $t("period") }}</q-item-label>
          <q-item-label class="text-h5 text-positive">
            {{ issue.issue }}
            <div style="width:120px" v-if="!issue.id">
              <q-skeleton animation="pulse-x" />
            </div>
          </q-item-label>
        </q-item-section>
        <q-item-section></q-item-section>
        <q-item-section side>
          <q-item-label>{{ $t("count_down") }}</q-item-label>
          <q-item-label class="text-h5 text-negative">
            <div style="width:120px" v-if="!issue.id">
              <q-skeleton animation="pulse-x" />
            </div>

            <count-down
              v-if="issue.id"
              class="issue-count-down"
              :now="issue.server_time"
              :end="issue.saleend"
              :unit="{ minute: ':', second: '' }"
              @progress="progress"
              @over="timeOver"
            />
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-card>

    <q-separator />

    <q-list class="q-py-md bg-white q-mb-md">
      <q-item class="row q-gutter-md">
        <q-btn
          :size="btnSize"
          :class="{ 'select-color': btnSize === 'lg' }"
          class="col"
          :label="$t('join_selected', { val: item.label })"
          unelevated
          @click="selectVal(item.label)"
          no-caps
          :color="saleend ? 'grey-3' : item.color"
          v-for="(item, key) in colors"
          :key="key"
        />
      </q-item>

      <q-item class="row q-gutter-md">
        <q-btn
          :label="n"
          unelevated
          @click="selectVal(n)"
          class="col"
          :size="btnSize"
          :color="saleend ? 'grey-3' : 'primary'"
          v-for="n in [0, 1, 2, 3, 4]"
          :key="n"
        />
      </q-item>
      <q-item class="row q-gutter-md">
        <q-btn
          :label="n"
          unelevated
          @click="selectVal(n)"
          class="col"
          :size="btnSize"
          :color="saleend ? 'grey-3' : 'primary'"
          v-for="n in [5, 6, 7, 8, 9]"
          :key="n"
        />
      </q-item>
    </q-list>

    <q-separator />

    <q-item clickable v-ripple class="bg-white" to="/page/game/record">
      <q-item-section>{{ $t("issue_record") }}</q-item-section>
      <q-item-section side>{{ $t("more") }}</q-item-section>
      <q-item-section side class="side-no-padding">
        <q-icon name="keyboard_arrow_right"></q-icon>
      </q-item-section>
    </q-item>
    <q-separator />
    <div class="q-px-md bg-white q-mb-md">
      <q-markup-table flat>
        <thead>
          <tr>
            <th class="text-left">{{ $t("period") }}</th>
            <th class="text-center">{{ $t("price") }}</th>
            <th class="text-center">{{ $t("number") }}</th>
            <th class="text-right">{{ $t("result") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in issueList" :key="i">
            <template v-if="!item.issue">
              <td colspan="4" class="text-center text-grey-8">
                <q-spinner class="on-left" />{{ $t("loading") }}...
              </td>
            </template>
            <template v-else>
              <td class="text-left">{{ item.issue }}</td>
              <td class="text-center">{{ item.code }}</td>
              <td class="text-center">{{ item.last_digits }}</td>
              <td class="text-right">
                <div v-if="item.colors">
                  <q-icon
                    v-for="(c, k) in item.colors.split(',')"
                    :key="k"
                    name="lens"
                    :color="$config.options.colors[c]"
                  />
                </div>
              </td>
            </template>
          </tr>
        </tbody>
      </q-markup-table>
    </div>

    <q-item clickable v-ripple class="bg-white" to="/page/game/projects">
      <q-item-section>{{ $t("my_orders") }}</q-item-section>
      <q-item-section side>{{ $t("more") }}</q-item-section>
      <q-item-section side class="side-no-padding">
        <q-icon name="keyboard_arrow_right"></q-icon>
      </q-item-section>
    </q-item>
    <q-separator />
    <div class="q-px-md q-mb-md bg-white">
      <q-item-section
        class="text-center q-pa-md"
        v-if="!projectsList || projectsList.length < 1"
      >
        {{ $t("no_more") }}
      </q-item-section>
      <q-markup-table flat v-else>
        <thead>
          <tr>
            <th class="text-left">{{ $t("period") }}</th>
            <th class="text-center">{{ $t("price") }}</th>
            <th class="text-center">{{ $t("total") }}</th>
            <th class="text-right">{{ $t("status") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in projectsList" :key="i">
            <td class="text-left">{{ item.issue }}</td>
            <td class="text-center">
              <q-icon
                v-if="item.color !== 'singular'"
                name="lens"
                :color="$config.options.colors[item.color]"
              />
              <span v-else>{{ item.code }}</span>
            </td>
            <td class="text-center">{{ item.totalprice }}</td>
            <td class="text-right">{{ statusText(item.isgetprize) }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>

    <wager-dialog v-model="wagerDialog" :select="select" @confirm="wager" />
    <agreement-dialog v-model="ruleDialog" :content="howToPlay.content" />
  </q-page>
</template>

<script>
import { SessionStorage } from "quasar";
import Config from "../assets/js/config";
import WagerDialog from "../components/WagerDialog";
import {
  agreement,
  play,
  wager,
  issues,
  projects,
  userinfo
} from "../assets/js/api";
import AgreementDialog from "../components/AgreementDialog";
import CountDown from "../components/CountDown";

export default {
  name: "GamePage",
  components: {
    WagerDialog,
    AgreementDialog,
    CountDown
  },
  data() {
    return {
      btnSize: "md",
      wagerDialog: false,
      ruleDialog: false,
      select: "",
      selected: "",
      colors: [
        { label: "green", color: "positive" },
        { label: "violet", color: "accent" },
        { label: "red", color: "negative" }
      ],
      numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      howToPlay: {
        content: ""
      },
      issue: {},
      issueList: [],
      projectsList: [],
      saleend: false
    };
  },
  computed: {
    headerBg() {
      return this.$store.state.common.headerBg;
    },
    userinfo() {
      return this.$store.state.member.userinfo;
    },
    currency() {
      return this.$store.state.common.currency;
    },
    selectedColor() {
      return this.$config.options.colors[this.selected]
        ? this.$config.options.colors[this.selected]
        : "primary";
    }
  },
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
  methods: {
    statusText(state) {
      let status = ["no_judge", "winner", "lost"];
      return this.$t(status[state]);
    },
    progress(times) {
      this.saleend = false;
      if (times.time >= this.issue.canneldeadline) {
        this.saleend = true;
        this.wagerDialog = false;
      }
    },
    timeOver(times) {
      // 倒计时结束就开始新一期的销售
      this.saleend = false;
      this.play();
      this.issueList.unshift({});
      setTimeout(() => {
        this.getIssueList();
        this.getProjectsList();
        this.getUserinfo();
      }, 3000);
    },
    selectVal(val) {
      if (this.saleend) {
        return false;
      }
      if (this.numbers.indexOf(val) !== -1) {
        this.select = val;
        this.selected = val;
      } else {
        this.colors.map(v => {
          if (v.label === val) {
            this.select = v;
            this.selected = v.label;
          }
        });
      }
    },
    play() {
      play().then(ret => {
        this.issue = ret;
      });
    },
    getIssueList() {
      issues(1, 10).then(ret => {
        this.issueList = ret.rows;
      });
    },
    getProjectsList() {
      projects(1, 10).then(ret => {
        this.projectsList = ret.rows;
      });
    },
    wager(data) {
      wager(this.issue.issue, this.selected, data.money, data.number).then(
        ret => {
          this.getProjectsList();
          this.getUserinfo();
          this.$toastr.success({
            message: this.$t("success"),
            caption: "selected " + this.selected
          });
        }
      );
    },
    getUserinfo() {
      userinfo().then(ret => {
        this.$store.commit("member/setUserinfo", ret);
      });
    },
    cleartime() {
      if (this.userinfo.test) {
        this.$q.sessionStorage.remove(Config.key("game_limit_time"));
        window.location.reload();
      }
    }
  },
  watch: {
    select(val) {
      if (val !== "") {
        this.wagerDialog = true;
      }
    },
    wagerDialog(val) {
      if (!val) {
        this.select = "";
      }
    },
    saleend(val) {
      this.$q.sessionStorage.set(this.$config.key("saleend"), val);
    }
  },
  mounted() {
    if (this.userinfo.test) {
      this.timeout = setTimeout(() => {
        window.location.reload();
      }, Config.options.game_limit_time);
    }
  },
  destroyed() {
    clearTimeout(this.timeout);
  },
  created() {
    this.saleend = this.$q.sessionStorage.getItem(this.$config.key("saleend"));
    this.play();
    this.getIssueList();
    this.getProjectsList();
    agreement("game_rules,how_to_play").then(article => {
      article.map(v => {
        if (v.name === "game_rules") {
          this.$store.commit("common/setGameRules", v);
        }
        if (v.name === "how_to_play") {
          this.howToPlay.content = v.content;
        }
      });
    });
  }
};
</script>

<style lang="stylus">
.issue-count-down.count-down i.t{
  background-color #eee
  border-radius 3px
  width 24px
  box-sizing content-box;
  margin-left 5px
}
.issue-count-down.count-down i.u{
  margin-left 5px
}
.select-color .q-btn__content .block{
  width 50px
}
</style>
