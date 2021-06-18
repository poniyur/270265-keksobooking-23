let data = null;
let getData = () => undefined;

const init = (config) => {
  getData = config.getData;
};

const run = () => {
  data = getData();
  data; // just for linter
};

export {init, run};
