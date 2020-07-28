import Config from "assets/js/config";

export default function() {
  return {
    loadings: [],
    headerBg: "/grzx_bj.jpg",
    background: {
      wallet: {
        url: "/wallet.png"
      }
    },
    gameRules: {
      subTitle: "",
      content: ""
    },
    cdnurl: Config.options.baseURL,
    currency: {
      symbol: "₹"
    },
    tmpGoods: "",
    redEnvelopesBg: "/envelopes_bg.jpg"
  };
}
