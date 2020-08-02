import axios from "axios";
import Qs from "qs";
import Toastr from "assets/js/toastr";

export const api = (path, params, option = {}, type = "post") => {
  type = type.toLowerCase();
  let settings = Object.assign(
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    },
    option
  );

  if (type === "post") {
    return axios
      .post(path, Qs.stringify(params), settings)
      .then(ret => {
        let { msg, data } = ret;
        if (option.toastr) {
          Toastr.success(msg || "操作成功");
        }
        return Promise.resolve(data);
      })
      .catch(err => {
        if (err && err.msg) {
          Toastr.error(err.msg);
        }
        return Promise.reject(err);
      });
  }
  if (type === "get") {
    settings.params = params;
    return axios
      .get(path, settings)
      .then(ret => {
        return Promise.resolve(ret);
      })
      .catch(err => {
        if (err && err.msg) {
          Toastr.error(err.msg);
        }
        return Promise.reject(err);
      });
  }
};
