import { api } from "./fetch";

export const getInit = () => {
  return api("/index/init", {}, { api: "init" });
};

export const register = ({ mobile, password, code, referrer }) => {
  return api(
    "/user/register",
    {
      mobile,
      password,
      code,
      referrer,
      username: mobile
    },
    { api: "register" }
  );
};

export const login = ({ mobile, password }) => {
  return api(
    "/user/login",
    {
      account: mobile,
      password
    },
    { api: "login" }
  );
};

export const forget = ({ type, mobile, newpassword, captcha }) => {
  return api(
    "/user/resetpwd",
    {
      type,
      mobile,
      newpassword,
      captcha
    },
    { api: "forget" }
  );
};

export const userinfo = () => {
  return api("/user/index");
};

export const logout = () => {
  return api("/user/logout", {}, { api: "logout" });
};

export const agreement = name => {
  return api("/index/agreement", { name }, { api: "agreement" });
};

export const smsSend = (mobile, event) => {
  return api("/sms/send", { mobile, event }, { api: "smsSend" });
};

export const goodsList = params => {
  return api("/goods/index", params, { api: "goodsList" }, "get");
};

export const showGoods = id => {
  return api("/goods/show", { id }, { api: "showGoods" });
};

export const play = () => {
  return api("/game/play", {}, { api: "play" });
};

export const wager = (issue, selected, money, number) => {
  return api(
    "/game/wager",
    { issue, selected, money, number },
    { api: "wager" }
  );
};

export const issues = (page, limit) => {
  return api("/game/issues", { page, limit }, { api: "issues" }, "get");
};

export const projects = (page, limit) => {
  return api("/game/projects", { page, limit }, { api: "projects" }, "get");
};

export const billingList = (page, limit) => {
  return api("/lists/billing", { page, limit }, { api: "billingList" }, "get");
};

export const envelope = (code, token) => {
  return api("/envelope/show", { code, token }, { api: "envelope" }, "post");
};

export const robEnvelope = (code, token) => {
  return api("/envelope/rob", { code, token }, { api: "robEnvelope" }, "post");
};

export const missionLists = params => {
  return api("/mission/lists", params, { api: "missionLists" }, "get");
};

export const missionReceive = id => {
  return api("/mission/receive", { id }, { api: "missionLists" }, "post");
};

export const complaintCategory = () => {
  return api("/complaint/category", {}, { api: "complaintCategory" }, "get");
};

export const complaintIndex = params => {
  return api("/complaint/index", params, { api: "complaintIndex" }, "get");
};

export const complaintAdd = params => {
  return api("/complaint/add", params, { api: "complaintAdd" }, "post");
};

export const search_word = params => {
  return api("/goods/search_word", params, { api: "search_word" }, "post");
};

export const financeAccount = () => {
  return api("/finance/account", {}, { api: "financeAccount" }, "post");
};

export const financeOpening = () => {
  return api("/finance/opening", {}, { api: "financeOpening" }, "post");
};

export const financeProducts = () => {
  return api("/finance/products", {}, { api: "financeProducts" }, "post");
};

export const financeBalanceInto = (product_id, amount) => {
  return api(
    "/finance/balance_into",
    { product_id, amount },
    { api: "financeBalanceInto" },
    "post"
  );
};

export const getPayType = () => {
  return api("/pay/paytype");
};

export const unifiedOrder = params => {
  return api("/pay/unified", params, { api: "unifiedOrder" }, "post");
};

export const getBankList = () => {
  return api("/bank/lists", {}, { api: "getBankList" }, "get");
};

export const addBank = row => {
  return api("/bank/add", { row }, { api: "addBank" }, "post");
};

export const BankSetDefault = id => {
  return api("/bank/set_default", { id }, { api: "BankSetDefault" }, "post");
};

export const changePassword = (password, newpassword) => {
  return api(
    "/user/change_password",
    { password, newpassword },
    {
      api: "changePassword"
    }
  );
};

export const resetPaymentPassword = params => {
  return api("/user/reset_payment_password", params, {
    api: "resetPaymentPassword"
  });
};

export const changeUserProfile = row => {
  return api(
    "/user/profile",
    { row },
    {
      api: "changeUserProfile"
    }
  );
};
export const withdrawAdd = params => {
  return api("/withdraw/add", params, {
    api: "withdrawAdd"
  });
};
export const promotionCount = params => {
  return api("/promotion/count", params, {
    api: "promotionCount"
  });
};
export const bonusRecord = params => {
  return api("/promotion/bonusRecord", params, {
    api: "bonusRecord"
  });
};
export const applyRecord = params => {
  return api("/promotion/applyRecord", params, {
    api: "applyRecord"
  });
};
export const promotionRecord = params => {
  return api("/promotion/promotionRecord", params, {
    api: "promotionRecord"
  });
};
export const applyToBalance = () => {
  return api(
    "/promotion/applyToBalance",
    {},
    {
      api: "applyToBalance"
    }
  );
};
