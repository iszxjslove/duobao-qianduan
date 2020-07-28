export function loadings(state) {
  let loadings = {};
  state.loadings.map(v => {
    loadings[v] = true;
  });
  return loadings;
}
