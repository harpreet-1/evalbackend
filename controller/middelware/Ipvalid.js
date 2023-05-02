const regx = /(^\d\.){4}$/;

const check = (string) => {
  return regx.test(string);
};

module.exports = check;
