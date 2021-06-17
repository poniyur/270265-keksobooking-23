const app = {};

app.init = (config) => {
  app.getData = config.getData;
  return app;
};

app.run = () => {
  app.getData();
};

app.getData = () => undefined;

export {app};
