import axios from "axios";
import Qs from "qs";
import Toastr from "assets/js/toastr";

export const api = async (path, params, option = {}, type = "post") => {
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
    try {
      const ret = await axios.post(path, Qs.stringify(params), settings);
      let { msg, data } = ret;
      if (option.toastr) {
        Toastr.success(msg || "操作成功");
      }
      return Promise.resolve(data);
    } catch (err) {
      if (err && err.msg) {
        Toastr.error(err.msg);
      }
      return Promise.reject(err);
    }
  }
  if (type === "get") {
    settings.params = params;
    try {
      const ret_2 = await axios.get(path, settings);
      return Promise.resolve(ret_2);
    } catch (err_1) {
      if (err_1 && err_1.msg) {
        Toastr.error(err_1.msg);
      }
      return Promise.reject(err_1);
    }
  }
};
