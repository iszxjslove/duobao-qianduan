<template>
  <q-dialog v-model="dialog">
    <q-card>
      <q-card-section v-if="title">
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <q-separator />

      <q-card-section
        v-html="content"
        style="max-height: 40vh"
        class="scroll bg-white"
      />

      <q-separator />

      <div v-if="subTitle" class="q-px-md q-pt-md text-body2">
        {{ subTitle }}
      </div>
      <q-card-actions align="right" v-if="cancelLabel || confirmLabel">
        <q-btn
          flat
          v-if="cancelLabel"
          :label="cancelLabel"
          color="grey"
          size="lg"
          @click="cancel(false)"
          v-close-popup
        />
        <q-btn
          flat
          v-if="confirmLabel"
          :label="confirmLabel"
          color="primary"
          size="lg"
          @click="confirm(true)"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "AgreementDialog",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: ""
    },
    subTitle: {
      type: [Boolean, String],
      default: false
    },
    title: {
      type: [Boolean, String],
      default: false
    },
    confirmLabel: {
      type: [Boolean, String],
      default: false
    },
    cancelLabel: {
      type: [Boolean, String],
      default: false
    }
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    confirm(val) {
      this.$emit("confirm", val);
    },
    cancel(val) {
      this.$emit("cancel", val);
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
