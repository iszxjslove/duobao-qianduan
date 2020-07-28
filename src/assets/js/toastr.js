import { Notify } from "quasar";

export default {
  success: msg => {
    let option = {
      message: "",
      color: "positive",
      icon: "check"
    };
    if (typeof msg === "object") {
      option = Object.assign(option, msg);
    } else {
      option.message = msg;
    }
    Notify.create(option);
  },
  error: msg => {
    let option = {
      message: "",
      color: "negative",
      icon: "warning"
    };
    if (typeof msg === "object") {
      option = Object.assign(option, msg);
    } else {
      option.message = msg;
    }
    Notify.create(option);
  },
  warning: msg => {
    let option = {
      message: "",
      color: "warning"
    };
    if (typeof msg === "object") {
      option = Object.assign(option, msg);
    } else {
      option.message = msg;
    }
    Notify.create(option);
  },
  info: msg => {
    let option = {
      message: "",
      color: "primary"
    };
    if (typeof msg === "object") {
      option = Object.assign(option, msg);
    } else {
      option.message = msg;
    }
    Notify.create(option);
  }
};
