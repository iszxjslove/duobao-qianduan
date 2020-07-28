import { Cookies, LocalStorage, SessionStorage } from "quasar";
import Configs from "../../assets/js/config";

export function login(state, params) {
  setUserinfo(state, params);
  SessionStorage.set(Configs.key("auth"), params.token);
  if (params.auto) {
    Cookies.set(Configs.key("auth"), params.token, Configs.options.cookie);
  } else {
    Cookies.remove(Configs.key("auth"));
  }
}

export function logout(state) {
  SessionStorage.remove(Configs.key("auth"));
  Cookies.remove(Configs.key("auth"));
  state.userinfo.token = "";
}

export function autoToken(state) {
  const token =
    SessionStorage.getItem(Configs.key("auth")) ||
    Cookies.get(Configs.key("auth"));

  if (token) {
    SessionStorage.set(Configs.key("auth"), token);
    state.userinfo.token = token;
  }
}

export function setUserinfo(state, userinfo) {
  if (userinfo) {
    LocalStorage.set(Configs.key("userinfo"), userinfo);
  } else {
    userinfo = LocalStorage.getItem(Configs.key("userinfo"));
  }
  for (const key in userinfo) {
    if (userinfo.hasOwnProperty(key) && state.userinfo.hasOwnProperty(key)) {
      state.userinfo[key] = userinfo[key];
    }
  }
}
