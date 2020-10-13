<template>
  <q-page>
    <q-pull-to-refresh @refresh="refresh">
      <q-infinite-scroll @load="onLoad" :disable="noData">
        <div class="q-pa-md">
          <q-list separator v-if="list.length">
            <q-item
              v-for="(item, index) in list"
              :key="index"
              clickable
              v-ripple
            >
              <q-item-section>
                <q-item-label>{{ item.joinip }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                {{ item.jointime | dateFormat }}
              </q-item-section>
            </q-item>
          </q-list>
          <!-- 骨架 -->
          <q-list v-if="!noData && !list.length">
            <q-item>
              <q-item-section avatar>
                <q-skeleton type="QAvatar" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" width="65%" />
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <q-separator v-if="!noData || list.length" />
        <template v-slot:loading>
          <div class="row justify-center q-my-md">
            <q-spinner-dots color="primary" size="40px" />
          </div>
        </template>
        <q-item-label v-show="noData" class="text-center q-pa-md text-grey">
          {{ list.length ? "the end" : "no data" }}
        </q-item-label>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </q-page>
</template>

<script>
import { dom } from "quasar";
const { height } = dom;

export default {
  name: "PromotionRecord",
  data() {
    return {
      offset: 0,
      scrollHeight: 0,
      noData: false,
      list: [],
      form: {
        page: 1,
        limit: 10
      }
    };
  },
  methods: {
    async refresh(done) {
      // this.list = [];
      this.form.page = 1;
      await this.getPromotionRecord();
      done();
    },
    async onLoad(page, done) {
      await this.getPromotionRecord();
      done();
    },
    getPromotionRecord() {
      return this.$apis.promotionRecord(this.form).then(res => {
        this.noData = this.form.limit !== res.rows.length;
        res.rows.forEach(el => {
          this.list.push(el);
        });
        this.form.page++;
        return res;
      });
    }
  }
};
</script>
