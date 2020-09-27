import * as apis from "src/assets/js/api.js";

export async function init({ commit }) {
  await apis.getInit().then(res => {
    commit("setCommon", res);
  });
}
