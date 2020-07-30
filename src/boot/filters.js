export default async ({ Vue, store }) => {
  Vue.filter("symbol", function(value, fixed = 2) {
    value = value ? value : 0;
    return (
      store.state.common.currency.symbol + " " + (value * 1).toFixed(fixed)
    );
  });

  Vue.filter("default", function(value, def) {
    return value ? value : def;
  });

  Vue.filter("cdn", function(path) {
    return store.state.common.cdnurl + path;
  });

  Vue.filter("concat", function(str1, str2, sep = "", pos) {
    let bef = str1,
      aft = str2;
    if (pos === "before") {
      bef = str2;
      aft = str1;
    }
    return bef + sep + aft;
  });
};
