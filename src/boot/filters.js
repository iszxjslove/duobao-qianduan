export default async ({ Vue, store }) => {
  Vue.filter("symbol", function(value) {
    return store.state.common.currency.symbol + " " + (value * 1).toFixed(2);
  });

  Vue.filter("default", function(value, def) {
    return value ? value : def;
  });
};
