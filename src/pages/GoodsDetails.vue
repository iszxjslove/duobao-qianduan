<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <q-page v-if="data">
        <q-img :src="data.picture | cdn" :ratio="1" class="bg-grey-1">
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
        <q-item>
          <q-item-section>
            <q-item-label class="text-center text-h6">
              {{ data.title }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section side class="text-warning text-bold text-h6">
            {{ data.selling_price | symbol }}
          </q-item-section>
          <q-item-section class="text-strike text-grey-8">
            {{ data.market_price | symbol }}
          </q-item-section>
        </q-item>
        <div class="q-px-md">{{ $t("quantity") }}</div>
        <q-item class="q-mb-lg">
          <q-item-section>
            <q-input dense v-model="number" outlined input-class="text-center">
              <template v-slot:prepend>
                <q-icon
                  name="remove"
                  v-touch-repeat:0:800:100.mouse.enter.space="decrement"
                  class="cursor-pointer"
                />
              </template>
              <template v-slot:append>
                <q-icon
                  name="add"
                  v-touch-repeat:0:800:100.mouse.enter.space="increment"
                  class="cursor-pointer"
                />
              </template>
            </q-input>
          </q-item-section>
          <q-item-section>
            {{ $t("in_stock") }}:{{ data.stocks }}
          </q-item-section>
        </q-item>
        <div class="text-center text-h5 q-pa-sm">{{ $t("description") }}</div>
        <q-separator />
        <q-card class="full-width overflow-hidden">
          <q-card-section v-html="data.desc"></q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
    <q-footer class="bg-grey-1">
      <q-toolbar class="q-px-none">
        <q-btn-group unelevated class="full-width no-border-radius">
          <q-btn
            size="lg"
            color="grey-3"
            icon="keyboard_arrow_left"
            class="text-grey-8"
            v-go-back="'/'"
          />
          <q-btn
            size="lg"
            color="grey-3"
            icon="o_home"
            to="/"
            class="text-grey-8"
          />
          <q-btn
            size="lg"
            :label="$t('buy_now')"
            class="full-width"
            color="primary"
            @click="buy"
          />
        </q-btn-group>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { showGoods } from "../assets/js/api";

export default {
  name: "GoodsDetails",
  data() {
    return {
      number: 1
    };
  },
  methods: {
    decrement() {
      if (this.number > 1) {
        this.number--;
      }
    },
    increment() {
      if (this.number < this.data.stocks) {
        this.number++;
      }
    },
    buy() {
      this.$toastr.warning({
        message: this.$t("no_authority"),
        color: "grey-7"
      });
    }
  },
  computed: {
    currency() {
      return this.$store.state.common.currency;
    },
    cdnurl() {
      return this.$store.state.common.cdnurl;
    },
    data() {
      return this.$store.state.common.tmpGoods;
    },
    desc() {
      if (this.data.desc) {
        var imgReg = /<img.*?(?:>|\/>)/gi;
        var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
        let desc = this.data.desc;
        var arr = desc.match(imgReg);
        for (var i = 0; i < arr.length; i++) {
          var src = arr[i].match(srcReg);
          if (!src[1].match(/^[http|https]/)) {
            desc = desc.replace(src[1], "/uploads" + src[1]);
          }
        }
        return desc;
      }
      return "";
    }
  },
  created() {
    if (!this.data) {
      showGoods(this.$route.query.id).then(ret => {
        this.$store.commit("common/setTmpGoods", ret);
      });
    }
  }
};
</script>
