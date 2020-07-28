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
        <q-tab name="answered" :label="$t('answered')" />
        <q-tab name="waiting" :label="$t('waiting')" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel
          name="answered"
          @show="scrollTarget = $refs.scrollTargetRef"
        >
          <div class="text-grey-8">
            <q-infinite-scroll
              @load="onLoad"
              :offset="250"
              ref="historicalScroll"
              :scroll-target="scrollTarget"
            >
              <q-list separator>
                <q-item v-for="item in list" :key="item.id">
                  <q-item-section>
                    <q-item-label>{{ item.create_time_text }}</q-item-label>
                    <q-item-label caption lines="2">
                      {{ item.desc }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    {{ item.status | statusText }}
                  </q-item-section>
                </q-item>
              </q-list>
              <div v-if="no_more" class="text-center q-pt-md">
                {{ $t("no_more") }}
              </div>
              <template v-slot:loading>
                <div class="row justify-center q-my-md">
                  <q-spinner-dots color="primary" size="40px" />
                </div>
              </template>
            </q-infinite-scroll>
          </div>
        </q-tab-panel>

        <q-tab-panel name="waiting">
          <div class="text-grey-8">
            <q-infinite-scroll
              @load="onLoad"
              :offset="250"
              ref="historicalScroll"
              :scroll-target="scrollTarget"
            >
              <q-list separator>
                <q-item v-for="item in list" :key="item.id">
                  <q-item-section>
                    <q-item-label>{{ item.create_time_text }}</q-item-label>
                    <q-item-label caption lines="2">
                      {{ item.desc }}
                    </q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    {{ item.status | statusText }}
                  </q-item-section>
                </q-item>
              </q-list>
              <div v-if="no_more" class="text-center q-pt-md">
                {{ $t("no_more") }}
              </div>
              <template v-slot:loading>
                <div class="row justify-center q-my-md">
                  <q-spinner-dots color="primary" size="40px" />
                </div>
              </template>
            </q-infinite-scroll>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn @click="addDialog = true" fab icon="add" color="primary" />
    </q-page-sticky>

    <add-dialog v-model="addDialog" />
  </q-page>
</template>

<script>
import addDialog from "../components/complaint/add";
import { complaintIndex } from "../assets/js/api";

export default {
  name: "ComplaintPage",
  components: {
    addDialog
  },
  filters: {
    statusText: function(value) {
      let status = ["waiting", "answered"];
      return status[value];
    }
  },
  data() {
    return {
      tab: "answered",
      addDialog: false,
      scrollTarget: void 0,
      no_more: false,
      limit: 10,
      page: 1,
      list: []
    };
  },
  computed: {
    params() {
      let filter = {};
      let op = {};
      if (this.tab === "answered") {
        filter = { status: 1 };
        op = { status: "=" };
      } else {
        filter = { status: 0 };
        op = { status: "=" };
      }
      return {
        sort: "id",
        order: "desc",
        offset: (this.page - 1) * this.limit,
        limit: this.limit,
        filter: filter,
        op: op
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
      complaintIndex(this.params).then(ret => {
        if (index === 1) {
          this.list = [];
        }
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
