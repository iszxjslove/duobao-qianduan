<template>
  <q-page class="bg-positive q-pa-md">
    <q-card class="bg-white q-mb-md">
      <q-card-section class="text-center">
        <q-btn class="glossy" color="orange" rounded unelevated>
          {{ $t("my_mission") }}
          <q-avatar
            color="white"
            class="on-right"
            text-color="orange"
            size="sm"
          >
            {{ $t("go") }}
          </q-avatar>
        </q-btn>
        <div class="text-center q-mt-md text-caption text-orange">
          {{ $t("do_tasks_and_get_benefits") }}
        </div>
      </q-card-section>

      <div class="mission-line left-line">
        <span class="round ft"></span>
        <span class="round fb"></span>
        <span class="line"></span>
      </div>
      <div class="mission-line right-line">
        <span class="round ft"></span>
        <span class="round fb"></span>
        <span class="line"></span>
      </div>
    </q-card>

    <q-card class="q-py-md">
      <q-list @show="scrollTarget = $refs.scrollTargetRef">
        <q-infinite-scroll
          @load="onLoad"
          :offset="250"
          ref="historicalScroll"
          :scroll-target="scrollTarget"
        >
          <template v-for="(item, key) in list">
            <q-item :key="key">
              <q-item-section top avatar>
                <q-avatar color="orange" text-color="white">
                  <i class="fas fa-users"></i>
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label>{{ item.title }}</q-item-label>
                <q-item-label class="row items-center">
                  <q-linear-progress
                    style="width:60px;"
                    rounded
                    stripe
                    size="6px"
                    :value="item.still_some / item.amount_limit"
                  />
                  <span class="text-caption on-right">
                    <span>{{ item.still_some | default(0) }}</span>
                    /
                    <span>{{ item.amount_limit }}</span>
                  </span>
                </q-item-label>
                <q-item-label caption>
                  <div>start time: {{ item.start_time }}</div>
                  <div>end time: {{ item.end_time }}</div>
                </q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>{{ item.bonus | symbol }}</q-item-label>
                <q-btn
                  :label="$t('get')"
                  :outline="false"
                  color="positive"
                  class="glossy q-mt-sm"
                  rounded
                  unelevated
                  size="xs"
                  @click="receive(item)"
                />
              </q-item-section>
            </q-item>
            <q-separator spaced inset="item" :key="'separator' + key" />
          </template>
          <div v-if="no_more" class="text-center q-pt-md">
            {{ $t("no_more") }}
          </div>

          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </q-list>
    </q-card>
  </q-page>
</template>

<script>
import { missionLists, missionReceive } from "../assets/js/api";

export default {
  name: "MissionPage",
  data() {
    return {
      scrollTarget: void 0,
      no_more: false,
      limit: 10,
      page: 1,
      list: []
    };
  },
  computed: {
    params() {
      return {
        sort: "",
        order: "release_time desc,start_time",
        offset: (this.page - 1) * this.limit,
        limit: this.limit
      };
    }
  },
  methods: {
    receive(item) {
      missionReceive(item.id).then(ret => {
        console.log(ret);
      });
    },
    onLoad(index, done) {
      this.page = index;
      missionLists(this.params).then(ret => {
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

<style lang="stylus" scoped>
.mission-line
  position absolute
  bottom 0
  width 10px
  height 50px
  .round
    display inline-block
    border-radius 100%
    border 5px solid var(--q-color-positive)
    position absolute
  .round.ft
      top 0
  .round.fb
      bottom 0
      z-index 1
  .line
    display inline-block
    height 42px
    background-color #ff9800
    width 5px
    z-index 2
    position absolute
    top 4px
    left 50%
    transform translateX(-50%)
    border-radius 3px
.mission-line.left-line
  left 15px
  bottom -30px
.mission-line.right-line
  right 15px
  bottom -30px
</style>
