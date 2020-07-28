<template>
  <div
    ref="scrollTargetRef"
    class="scroll"
    style="max-height: calc(100vh - 100px)"
    @show="scrollTarget = $refs.scrollTargetRef"
  >
    <q-infinite-scroll
      @load="onLoad"
      :offset="250"
      :scroll-target="scrollTarget"
      ref="historicalScroll"
    >
      <div v-for="item in list" :key="item.id">
        <q-item>
          <q-item-section>
            <q-item-label>{{ item.totalprice }}</q-item-label>
            <q-item-label class="text-caption">
              {{ $t("contract_money") }}
            </q-item-label>
          </q-item-section>
          <q-item-section class="text-right">
            <q-item-label class="text-caption">
              {{ $t("create_time") }}
            </q-item-label>
            <q-item-label>
              {{ item.create_time_text }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator inset />
        <div class="q-py-sm">
          <div class="row q-px-md text-body2">
            <div class="col-3 text-grey-6">{{ $t("period") }}</div>
            <div class="col-3">{{ item.issue }}</div>
            <div class="col-3 text-grey-6 text-right">{{ $t("select") }}</div>
            <div
              class="col-3 text-right"
              :class="'text-' + $config.options.colors[item.color]"
            >
              {{ item.color | selected(item) }}
            </div>
          </div>
          <div class="row q-px-md text-body2">
            <div class="col-3 text-grey-6">{{ $t("status") }}</div>
            <div class="col-3">{{ item.isgetprize | isgetprize }}</div>
            <div class="col-3 text-grey-6 text-right">{{ $t("delivery") }}</div>
            <div class="col-3 text-right">
              {{ item.contract_amount }}
            </div>
          </div>
          <div class="row q-px-md text-body2">
            <div class="col-3 text-grey-6">{{ $t("open_price") }}</div>
            <div class="col-3">{{ item.no_code }}</div>
            <div class="col-3 text-grey-6 text-right">{{ $t("fee") }}</div>
            <div class="col-3 text-right">
              {{ item.fee }}
            </div>
          </div>
          <div class="row q-px-md text-body2">
            <div class="col-3 text-grey-6">{{ $t("result") }}</div>
            <div class="col-3">
              <span :class="'text-' + $config.options.colors['singular']">
                {{ item.no_code.charAt(item.no_code.length - 1) }}
              </span>
              <span
                v-for="(c, ci) in item.no_colors.split(',')"
                :key="item.id + '-' + ci"
                :class="'text-' + $config.options.colors[c]"
              >
                {{ c }}
              </span>
            </div>
            <div class="col-3 text-grey-6 text-right">{{ $t("amount") }}</div>
            <div
              class="col-3 text-right"
              :class="'text-' + $config.options.colors[item.color]"
            >
              {{ item.bonus | realbonus(item) }}
            </div>
          </div>
        </div>
        <q-separator inset />
        <q-item>
          <q-item-section></q-item-section>
          <q-item-section side>
            <q-btn :label="$t('complaint')" outline no-caps dense size="sm" />
          </q-item-section>
        </q-item>
        <q-separator class="q-mb-md" />
      </div>
      <div v-if="no_more" class="text-center">
        {{ $t("no_more") }}
      </div>

      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </div>
</template>

<script>
import { projects } from "../../assets/js/api";
import { dom } from "quasar";

export default {
  name: "Historical",
  filters: {
    selected: function(color, item) {
      return color === "singular" ? item.code : color;
    },
    realbonus(bonus, item) {
      switch (item.isgetprize) {
        case 1:
          return "+" + bonus;
        case 2:
          return "-" + item.contract_amount;
        default:
          return "aaa";
      }
    },
    isgetprize: function(status, t) {
      let text = "";
      switch (status) {
        case 1:
          text = "success";
          break;
        case 2:
          text = "fail";
          break;
        default:
          text = "waiting";
          break;
      }
      return text;
    }
  },
  data() {
    return {
      no_more: false,
      scrollTarget: void 0,
      limit: 10,
      page: 1,
      list: []
    };
  },
  computed: {
    params() {
      return {
        sort: "id",
        order: "desc",
        offset: (this.page - 1) * this.limit,
        limit: this.limit,
        filter: { isgetprize: 0 },
        op: { isgetprize: ">" }
      };
    }
  },
  methods: {
    onLoad(index, done) {
      this.page = index;
      projects(this.params).then(ret => {
        if (ret.rows && ret.rows.length > 0) {
          ret.rows.map(v => {
            this.list.push(v);
          });
        } else {
          this.$refs.historicalScroll.stop();
          this.no_more = true;
        }
        done();
      });
    }
  }
};
</script>
