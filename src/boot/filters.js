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
