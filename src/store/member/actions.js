import { logout } from "../../assets/js/api";

// 退出登录
export function logoutAction({ commit }) {
  return logout().then(ret => {
    commit("logout");
  });
}
