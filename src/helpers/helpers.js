const moment = require("moment");

exports.catchErrors = fn => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

exports.createCategoryObject = (categories, arrayOfObjects) => {
  const object = {};
  categories.forEach(
    (category, index) => (object[category] = arrayOfObjects[index])
  );
  return object;
};

exports.createUniquePropertiesArray = (data, property) => {
  const duplicateProperties = data.map(object => object[property]);
  const uniquePropertiesArray = [...new Set(duplicateProperties)];
  console.log("unique properties array", uniquePropertiesArray);
  return uniquePropertiesArray;
};

exports.groupItemsByProperty = (data, propertyName, propertyValue) => {
  return data.filter(object => object[propertyName] === propertyValue);
};

exports.calculateTotalValue = categoryItems => {
  return categoryItems.reduce(
    (prevTotal, object) => prevTotal + object.amount,
    0
  );
};

exports.calculateTotalNumber = categoryItems => {
  return categoryItems.length;
};

exports.calculateAverageValue = (totalValue, totalNumber) => {
  return totalValue / totalNumber;
};

exports.createObject = (totalNumber, totalValue, averageValue) => {
  return {
    totalNumber,
    totalValue,
    averageValue
  };
};

exports.formatDate = dateString => {
  return moment(dateString).format("DD/MM/YYYY");
};
