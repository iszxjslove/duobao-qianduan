import { date } from "quasar";
export default async ({ Vue, store }) => {
  const filters = {
    symbol: (value, fixed = 2) => {
      value = value ? value : 0;
      return (
        store.state.common.currency.symbol + " " + (value * 1).toFixed(fixed)
      );
    },
    default: (value, def) => {
      return value ? value : def;
    },
    cdn: path => {
      return store.state.common.cdnurl + path;
    },
    dateFormat(time, format = "YYYY-MM-DD HH:mm:ss") {
      // YYYY-MM-DDTHH:mm:ss.SSSZ
      if (typeof time == "number") {
        if (time.toString().length == 10) {
          time += "000";
        }
        time = new Date().setTime(time);
      }
      return date.formatDate(time, format);
    },
    concat: (str1, str2, sep = "", pos) => {
      let bef = str1,
        aft = str2;
      if (pos === "before") {
        bef = str2;
        aft = str1;
      }
      return bef + sep + aft;
    }
  };
  for (const key in filters) {
    if (filters.hasOwnProperty(key)) {
      Vue.filter(key, filters[key]);
    }
  }
  Vue.prototype.$q.filters = filters;
};
