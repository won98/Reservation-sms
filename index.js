const api = require("./app");

const Boot = async () => {
  await api.envLoad();
  await api.cloneDB();
  await api.start(); //http
};

Boot();
