const options = {
  prefix: "treasure_store_",
  // development: "http://192.168.0.9:18080/",
  development: "http://api.duobao.com/",
  production: "https://api.winwinclubs.com/",
  game_limit_time: 30000,
  cookie: {
    domain: "",
    secure: false,
    expires: 10
  },
  colors: {
    green: "positive",
    violet: "accent",
    red: "negative",
    singular: "primary"
  }
};

const key = key => {
  return options.prefix + key;
};

export default {
  key,
  options
};
