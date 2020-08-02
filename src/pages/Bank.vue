<template>
  <q-page class="q-pa-md ">
    <div class="q-gutter-md">
      <q-card
        v-for="card in bankList"
        :key="card.id"
        class="bg-positive text-white"
      >
        <q-card-section>
          <q-item class="q-pa-none">
            <q-item-section>
              <q-item-label>{{ card.actual_name }}</q-item-label>
            </q-item-section>
            <q-item-section side class="text-white">
              {{ card.ifsc_code }}
            </q-item-section>
          </q-item>
        </q-card-section>
        <q-card-section>
          <q-item class="q-pa-none">
            <q-item-section>
              <q-item-label>{{ card.actual_name }}</q-item-label>
            </q-item-section>
            <q-item-section side class="text-white">
              <span v-if="card.is_default === 1">{{ $t("default") }}</span>
              <q-icon
                name="settings"
                @click="setDefault(card.id)"
                v-else
              ></q-icon>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </div>
    <div class="text-center" v-if="bankList.length < 1">
      {{ $t("no_card") }}
    </div>
    <q-btn
      class="full-width q-mt-lg"
      color="primary"
      size="lg"
      unelevated
      icon="add"
      :label="$t('new_bank_card')"
      no-caps
      @click="addBankDialog = true"
    />
    <add-bank v-model="addBankDialog" @success="addBankCallback" />
  </q-page>
</template>

<script>
import { getBankList, BankSetDefault } from "../assets/js/api";
import AddBank from "../components/AddBank.vue";

export default {
  name: "BankPage",
  components: {
    AddBank
  },
  data() {
    return {
      bankList: [],
      addBankDialog: false
    };
  },
  methods: {
    setDefault(id) {
      this.$q
        .dialog({
          title: this.$t("confirm"),
          message: this.$t("Set this card as default"),
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          BankSetDefault(id).then(ret => {
            this.getBanks();
          });
        });
    },
    addBankCallback() {
      this.getBanks();
    },
    getBanks(update) {
      getBankList().then(ret => {
        this.bankList = ret.rows;
      });
    }
  },
  created() {
    this.getBanks();
  }
};
</script>
