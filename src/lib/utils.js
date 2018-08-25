export const importBaseComponents = (Vue, components) => {
  Object.entries(components).forEach(([name, component]) => {
    if (/^Base/.test(name)) {
      Vue.component(name, component);
    }
  });
};
