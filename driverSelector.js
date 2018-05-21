const driverSelector = drivers => {
  const random = Math.floor(Math.random() * 5);
  return drivers[random];
};

module.exports.driverSelector = driverSelector;
