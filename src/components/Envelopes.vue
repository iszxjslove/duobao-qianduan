<template>
  <q-dialog
    v-model="dialog"
    maximized
    transition-show="slide-down"
    transition-hide="slide-up"
  >
    <q-card class="text-white bg-transparent-black-8">
      <q-card-section class="q-mt-xl">
        <q-card
          class="envelope"
          style="margin:0 auto"
          v-if="!data.my_claim_status"
        >
          <q-card-section class="envelope-up">
            <div class="bg"></div>
            <div class="absolute text-center center" style="width:70%">
              <div>{{ data.form_user }}</div>
              <div class="text-h6">{{ $t("red_envelope") }}</div>
              <div class="text-body2" v-if="hasOpen">
                {{ data.title }}
              </div>
              <div class="text-body2" v-else>
                {{ $t("you_cant_get_this_red_envelope") }}
              </div>
            </div>
          </q-card-section>
          <q-card-section class="envelope-down">
            <q-btn
              label="OPEN"
              class="absolute fixed-open q-pa-sm"
              glossy
              color="amber"
              round
              size="lg"
              v-if="hasOpen"
              @click="robEnvelope()"
            />
            <q-btn
              icon="close"
              color="warning"
              class="absolute fixed-close"
              outline
              round
              dense
              v-close-popup
            />
          </q-card-section>
        </q-card>

        <q-card
          class="envelope"
          style="margin:0 auto;background-color:#fff"
          v-else
        >
          <q-card-section style="height: 100px; overflow:hidden">
            <div class="top-bg text-center q-pt-lg">
              <div class="text-h6">{{ $t("red_envelope") }}</div>
            </div>
          </q-card-section>
          <q-card-section style="height: 300px">
            <div
              class="absolute text-center center text-warning"
              style="width:70%;"
            >
              <div>{{ data.form_user }}</div>
              <div class="text-body2 q-mb-xl">
                {{ data.title }}
              </div>
              <div class="text-h4">{{ data.my_claim_amount | symbol }}</div>
            </div>
          </q-card-section>
          <q-card-section style="height: 100px">
            <q-btn
              icon="close"
              color="warning"
              class="absolute fixed-close"
              outline
              round
              dense
              v-close-popup
            />
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { envelope, robEnvelope } from "../assets/js/api";

export default {
  name: "EnvelopesDialog",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    code: {
      type: String,
      default: ""
    },
    token: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      dialog: false,
      data: {},
      hasOpen: false
    };
  },
  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      if (val) {
        this.getRedEnvelopes();
      }
      this.$emit("input", val);
    }
  },
  methods: {
    getRedEnvelopes() {
      envelope(this.code, this.token).then(ret => {
        this.data = ret;
        this.hasOpen =
          this.data.claim_status != 2 && this.data.return_status != 1;
      });
    },
    robEnvelope(code, token) {
      if (!code || !token) {
        code = this.code;
        token = this.token;
      }
      robEnvelope(code, token).then(ret => {
        this.data.my_claim_status = 1;
        this.data.my_claim_amount = ret.amount;
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.center{
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.envelope{
  min-height 100px
  width 300px
  background-color #e62020
  .top-bg{
    margin: 0 auto;
    position: absolute;
    width: 350px;
    height: 100%;
    background-color: #e62020;
    left: 50%;
    border-radius: 0 0 100% 100%;
    transform: translateX(-50%);
    top: 0;
  }
  .envelope-up{
    position relative
    overflow hidden
    min-height 400px
    .bg{
      margin: 0 auto;
      position: absolute;
      width: 500px;
      height: 100%;
      background-color: #f03535;
      left: 50%;
      border-radius: 0 0 100% 100%;
      transform: translateX(-50%);
      top: 0;
    }
  }
  .envelope-down{
    min-height 100px
    background-color #e62020
    .fixed-open{
      font-size: 20px;
      top: 0;
      transform: translate(-50%, -50%);
      left: 50%;
    }
  }
  .fixed-close{
    left: 50%;
    transform: translateX(-50%);
    bottom: -80px;
  }
}
</style>
