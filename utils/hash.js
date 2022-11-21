const bcrypt = require("bcryptjs");

module.exports = {
  Hash: (passwd) => {
    const salt = bcrypt.genSaltSync(Number(10));
    const hash = bcrypt.hashSync(passwd, salt);
    return hash;
  },
  compare: (passwd, dbpasswd) => {
    return bcrypt.compareSync(passwd, dbpasswd);
  },
};
