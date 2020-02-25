const dateParse = (date) => {
  const str = date.toString();
  const y = str.substr(0, 4);
  const m = str.substr(4, 2);
  const d = str.substr(6, 2);
  return new Date(y, m - 1, d);
};

module.exports = { dateParse };
