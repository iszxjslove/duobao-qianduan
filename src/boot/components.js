import Vue from "vue";
import AgreementDialog from "../components/AgreementDialog";
import CountDown from "../components/CountDown";
import WagerDialog from "../components/WagerDialog";
import InfiniteScroll from "../components/InfiniteScroll";

// we globally register our component
Vue.component("AgreementDialog", AgreementDialog);
Vue.component("CountDown", CountDown);
Vue.component("WagerDialog", WagerDialog);
Vue.component("InfiniteScroll", InfiniteScroll);
