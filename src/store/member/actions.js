import * as apis from "src/assets/js/api.js";

// 退出登录
export async function logoutAction({ commit }) {
  await apis.logout();
  commit("logout");
}

export function updateUserinfo({ commit }) {
  apis.userinfo().then(res => {
    commit("setUserinfo", res);
  });
}

export function getToken({ state, commit }) {
  commit("autoToken");
  return state.userinfo.token;
}
