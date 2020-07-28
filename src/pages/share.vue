<template>
  <q-page>
    <img :src="qrcode" width="100%" />
    <q-item class="fixed-bottom bg-white">
      <q-item-section>
        <q-item-label>{{ $t("my_invite_link") }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-btn
          unelevated
          color="primary"
          no-caps
          :label="$t('copy')"
          @click="copyCode(shareUrl)"
        />
      </q-item-section>
    </q-item>
  </q-page>
</template>

<script>
import { userinfo } from "../assets/js/api";
import QRCode from "qrcode";
import { dom, copyToClipboard } from "quasar";
const { height, width } = dom;

export default {
  name: "SharePage",
  data() {
    return {
      qrcode: ""
    };
  },
  computed: {
    shareBg() {
      return this.$store.state.member.userinfo.shareBg;
    },
    userinfo() {
      let info = this.$store.state.member.userinfo;
      if (!info.token) {
        this.getUserInfo();
      }
      return info;
    },
    shareUrl() {
      let hash = this.$router.mode === "hash" ? "/#" : "";
      return (
        window.location.origin +
        hash +
        "/register?referrer=" +
        this.userinfo.referrer
      );
    }
  },
  methods: {
    getUserInfo() {
      userinfo().then(ret => {
        this.$store.commit("member/setUserinfo", ret);
      });
    },
    copyCode(text) {
      copyToClipboard(text)
        .then(() => {
          this.$toastr.success(
            this.$t("copy_success", { text: this.$t("code") })
          );
        })
        .catch(() => {
          this.$toastr.warning(
            this.$t("copy_error", { text: this.$t("code") })
          );
        });
    }
  },
  async mounted() {
    let qrSize = 300;
    let shareImage = new Image();
    shareImage.src = this.shareBg;
    shareImage.onload = async () => {
      let width = shareImage.naturalWidth;
      let height = shareImage.naturalHeight;
      let canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(shareImage, 0, 0, width, height);
      let qr = await QRCode.toDataURL(this.shareUrl); // 获取二维码
      let qrImage = new Image();
      qrImage.src = qr;
      qrImage.onload = () => {
        ctx.drawImage(
          qrImage,
          (canvas.width - qrSize) / 2,
          canvas.height - 585,
          qrSize,
          qrSize
        );

        // 线条
        ctx.fillStyle = "green"; // canvas 文本颜色
        ctx.font = "500 16px PingFangSC-Medium"; // canvas 文本属性
        ctx.fillText("-".repeat(45), 82, canvas.height - 280); // canvas 文本内容和位置定位

        // 填充矩形，推广码背景
        ctx.fillStyle = "rgba(33,196,71,.2)";
        ctx.fillRect((canvas.width - 300) / 2, canvas.height - 270, 300, 50);

        // 写推广码
        ctx.fillStyle = "rgba(33,196,71,1)"; // canvas 文本颜色
        ctx.font = "500 30px PingFangSC-Medium"; // canvas 文本属性
        ctx.textAlign = "center"; //如居中，文本水平对齐方式
        ctx.textBaseline = "middle";
        ctx.fillText(
          this.userinfo.referrer,
          canvas.width / 2,
          canvas.height - 245
        ); // canvas 文本内容和位置定位

        ctx.fillStyle = "rgba(0,0,0,.8)"; // canvas 文本颜色
        ctx.font = "500 20px PingFangSC-Medium"; // canvas 文本属性
        ctx.textAlign = "center"; //如居中，文本水平对齐方式
        ctx.textBaseline = "middle";
        ctx.fillText(
          this.$t("my_invite_code"),
          canvas.width / 2,
          canvas.height - 200
        ); // canvas 文本内容和位置定位

        this.qrcode = canvas.toDataURL("image/jpeg", 1.0); // 输出图片
      };
    };
  }
};
</script>
