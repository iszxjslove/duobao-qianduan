export function setGameRules(state, article) {
  state.gameRules.subTitle = article.subtitle;
  state.gameRules.content = article.content;
}

export function setTmpGoods(state, goods) {
  state.tmpGoods = goods;
}

export function loadingPush(state, load) {
  state.loadings.push(load);
}

export function loadingSplice(state, load) {
  let index = state.loadings.indexOf(load);
  if (index !== -1) {
    state.loadings.splice(index, 1);
  }
}
