import axios from "axios";
import Qs from "qs";
import Toastr from "assets/js/toastr";

export const api = (path, params, option = {}, type = "post") => {
  type = type.toLowerCase();
  option = Object.assign(
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    },
    option
  );

  if (type === "post") {
    params = Qs.stringify(params);
  }
  return axios[type](path, params, option)
    .then(ret => {
      if (type === "get") {
        return Promise.resolve(ret);
      } else {
        let { msg, data } = ret;
        if (option.toastr) {
          Toastr.success(msg || "操作成功");
        }
        return Promise.resolve(data);
      }
    })
    .catch(err => {
      if (err && err.msg) {
        Toastr.error(err.msg);
      }
      return Promise.reject(err);
    });
};
