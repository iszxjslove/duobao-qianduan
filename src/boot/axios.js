import Vue from "vue";
import axios from "axios";
import { Loading, SessionStorage } from "quasar";
import Configs from "assets/js/config";
import Toastr from "assets/js/toastr";

const baseURL = Configs.options[process.env.NODE_ENV];

Vue.prototype.$toastr = Toastr;
Vue.prototype.$axios = axios;
Vue.prototype.$config = Configs;

export default ({ router, store }) => {
  // 请求拦截器server_exception
  axios.interceptors.request.use(
    config => {
      if (config.api) store.commit("common/loadingPush", config.api);
      config.baseURL = baseURL;
      const token = SessionStorage.getItem(Configs.key("auth")) || "";
      config.headers["token"] = token;
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  //  响应拦截
  axios.interceptors.response.use(
    response => {
      if (response.config.api) {
        store.commit("common/loadingSplice", response.config.api);
      }
      Loading.hide();
      if (response.config.method.toUpperCase() === "GET") {
        return Promise.resolve(response.data);
      } else {
        const { code } = response.data;
        if (code === 1) {
          return Promise.resolve(response.data);
        } else {
          return Promise.reject(response.data);
        }
      }
    },
    error => {
      Loading.hide();
      let msg = "";
      if (error.response) {
        if (error.response.config.api) {
          store.commit("common/loadingSplice", error.response.config.api);
        }
        const { status, data } = error.response;
        const { msg } = data;
        switch (status) {
          case 401:
            // 未登录
            store.commit("member/logout");
            if (!router.currentRoute.query.redirect) {
              router.currentRoute.query.redirect = router.currentRoute.fullPath;
            }
            if (router.currentRoute.path !== "/login") {
              if (msg) {
                Toastr.error(msg);
              }
              router.push({
                path: "/login",
                query: router.currentRoute.query
              });
            }
            break;
          case 403:
            // 没有权限
            if (msg) {
              Toastr.error(msg);
            }
            router.replace({ path: "/" });
            break;
        }
      } else {
        msg = "server_exception";
        Toastr.warning(msg);
      }
      return Promise.reject(msg);
    }
  );
};
