<template>
  <div>
    <q-dialog v-model="dialog" position="bottom" full-width>
      <q-card class="non-selectable">
        <q-item>
          <q-item-section>{{ selectLabel }}</q-item-section>
          <q-item-section avatar>
            <q-btn
              unelevated
              dense
              round
              :label="selectType === 'number' ? select : ''"
              size="sm"
              :color="color"
            >
              <q-icon
                name="lens"
                v-if="selectType === 'object'"
                :color="select.color"
              />
            </q-btn>
          </q-item-section>
        </q-item>

        <q-separator />

        <div class="q-px-md q-mt-md text-grey-8">
          {{ $t("contract_money") }}
        </div>
        <q-item>
          <q-item-section>
            <q-btn-toggle
              v-model="money"
              color="grey-3"
              :text-color="color"
              :toggle-color="color"
              unelevated
              spread
              :options="[
                { label: '10', value: 10 },
                { label: '100', value: 100 },
                { label: '1000', value: 1000 },
                { label: '10000', value: 10000 }
              ]"
            />
          </q-item-section>
        </q-item>

        <div class="q-px-md q-mt-md text-grey-8">
          {{ $t("number") }}
        </div>
        <q-item>
          <q-item-section>
            <q-btn-toggle
              v-model="number"
              color="grey-3"
              :text-color="color"
              :toggle-color="color"
              unelevated
              :options="[
                { label: '3', value: 3 },
                { label: '5', value: 5 },
                { label: '10', value: 10 }
              ]"
            />
          </q-item-section>
          <q-item-section class="wager-number">
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
        </q-item>
        <div class="q-px-md text-right text-caption">
          Max inumlower singular 999 hands
        </div>

        <q-checkbox
          v-model="accept"
          color="primary"
          class="q-pa-md"
          :label="$t('i_agree_with_the')"
        >
          <span
            @click.stop="agreement = true"
            class="text-primary cursor-pointer"
          >
            {{ $t("presale_management_rules") }}
          </span>
        </q-checkbox>

        <q-btn-group unelevated class="full-width">
          <q-btn size="lg" color="grey-3" class="text-grey-8" @click="cancel">
            {{ $t("cancel") }}
          </q-btn>
          <q-btn size="lg" class="full-width" :color="color" @click="confirm">
            {{ $t("confirm") }}
          </q-btn>
        </q-btn-group>
      </q-card>
    </q-dialog>

    <agreement-dialog
      v-model="agreement"
      :confirm-label="$t('confirm')"
      :sub-title="gameRules.subTitle"
      :title="$t('game_rules')"
      :content="gameRules.content"
      @confirm="agreementConfirm"
    />
  </div>
</template>

<script>
import AgreementDialog from "../components/AgreementDialog";

export default {
  name: "WagerDialog",
  components: {
    AgreementDialog
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    select: {
      type: [Object, Number, String],
      default: ""
    }
  },
  data() {
    return {
      accept: true,
      agreement: false,
      dialog: false,
      money: 10,
      number: 1,
      maxNumber: 999
    };
  },
  computed: {
    gameRules() {
      return this.$store.state.common.gameRules;
    },
    selectType() {
      return typeof this.select;
    },
    selectLabel() {
      if (this.selectType === "object") {
        return this.$t("join_selected_color", { val: this.select.label });
      } else {
        return this.$t("join_selected_number", { val: this.select });
      }
    },
    color() {
      if (this.selectType === "object") {
        return this.select.color;
      } else {
        return "primary";
      }
    }
  },
  methods: {
    decrement() {
      if (this.number > 1) {
        this.number--;
      }
    },
    increment() {
      if (this.number < this.maxNumber) {
        this.number++;
      }
    },
    agreementConfirm(confirm) {
      this.accept = confirm;
    },
    confirm() {
      this.dialog = false;
      this.$emit("confirm", { money: this.money, number: this.number });
    },
    cancel() {
      this.dialog = false;
      this.$emit("cancel");
    }
  },
  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style lang="stylus">
.wager-number .q-field--dense .q-field__control,
.wager-number .q-field--dense .q-field__marginal{
  height:36px;
}
</style>
