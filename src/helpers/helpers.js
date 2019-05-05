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

exports.createUniqueCategories = data => {
  const duplicateCategories = data.map(object => object.category);
  const uniqueCategories = [...new Set(duplicateCategories)];
  return uniqueCategories;
};

exports.groupCategoryItems = (data, categoryName) => {
  return data.filter(object => object.category === categoryName);
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
