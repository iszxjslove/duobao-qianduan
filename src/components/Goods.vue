<template>
  <q-card flat @click="onClick">
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
    <q-card-section>
      <div class="text-h7">{{ data.title }}</div>
      <div class="text-subtitle2 text-warning">
        {{ data.selling_price | symbol }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "GoodsComponent",
  props: {
    to: {
      type: [Boolean, String],
      default: false
    },
    data: {
      type: [Object],
      default: () => ({})
    }
  },
  computed: {
    currency() {
      return this.$store.state.common.currency;
    },
    cdnurl() {
      return this.$store.state.common.cdnurl;
    }
  },
  methods: {
    onClick() {
      if (this.to) {
        this.$store.commit("common/setTmpGoods", this.data);
        this.$router.push({
          path: this.to,
          query: { id: this.data.id }
        });
      }
    }
  }
};
</script>
