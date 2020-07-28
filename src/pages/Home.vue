<template>
  <q-page class="bg-grey-2">
    <div class="q-mb-md bg-white text-center q-py-md">
      <div class="text-h6">WELCOME BACK</div>
      <div class="text-grey-6 text-caption">Quality Guarantee</div>
    </div>
    <div class="text-body1 text-center q-pa-md bg-white">RECOMMEND</div>
    <q-img src="shop_img.jpg" :ratio="16 / 9" class="bg-grey-1">
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
    <div class="row items-start row q-col-gutter-md q-pa-md bg-white">
      <div class="col-6" v-for="goods in goodsRows" :key="goods.id">
        <goods to="/goods/details" :data="goods" />
      </div>
    </div>
  </q-page>
</template>

<script>
import Goods from "../components/Goods";
import { goodsList } from "../assets/js/api";

export default {
  name: "HomePage",
  components: {
    Goods
  },
  data() {
    return {
      goodsRows: []
    };
  },
  created() {
    goodsList().then(ret => {
      this.goodsRows = ret.rows;
    });
  }
};
</script>
