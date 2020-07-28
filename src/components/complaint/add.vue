<template>
  <q-dialog
    v-model="dialog"
    persistent
    :maximized="maximizedToggle"
    transition-show="slide-left"
    transition-hide="slide-right"
  >
    <q-card class="bg-primary text-white">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">{{ $t("add_new") }}</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-select
            outlined
            behavior="menu"
            bg-color="white"
            v-model="category"
            :label="$t('type')"
            :options="categoryOptions"
            @filter="filterFn"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
          <q-input
            v-model="form.desc"
            bg-color="white"
            outlined
            type="textarea"
            :label="$t('description')"
          />
          <q-input
            outlined
            v-model="form.whatsapp"
            :label="$t('whats_app')"
            bg-color="white"
          />

          <div class="q-mt-md">
            <q-btn
              unelevated
              :label="$t('submit')"
              type="submit"
              class="full-width"
              size="lg"
              color="positive"
            />
          </div>
        </q-form>
      </q-card-section>

      <q-card-section>
        <q-item>
          <q-item-section side top class="text-white text-h6">
            {{ $t("service") }}
          </q-item-section>
          <q-item-section>
            <q-item-label>10:00-17:00, Monday - Friday</q-item-label>
            <q-item-label>about 1-5 business days.</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { complaintCategory, complaintAdd } from "../../assets/js/api";

export default {
  name: "addComplaint",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false,
      maximizedToggle: true,
      model: null,
      categoryOptions: null,
      category: null,
      form: {
        category_id: "",
        category_name: "",
        desc: "",
        whatsapp: ""
      }
    };
  },
  methods: {
    onSubmit() {
      complaintAdd(this.form).then(() => {
        this.dialog = false;
      });
    },
    filterFn(val, update, abort) {
      if (this.categoryOptions !== null) {
        update();
        return;
      }
      complaintCategory().then(ret => {
        update(() => {
          this.categoryOptions = ret.map(v => {
            return { value: v.id, label: v.name };
          });
        });
      });
    }
  },
  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      this.$emit("input", val);
    },
    category(val) {
      if (val) {
        this.form.category_id = val.value;
        this.form.category_name = val.label;
      }
    }
  },
  created() {}
};
</script>
