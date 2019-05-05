const Request = require("request");
const {
  createUniquePropertiesArray,
  createObject,
  calculateAverageValue,
  calculateTotalNumber,
  calculateTotalValue,
  groupItemsByProperty,
  createCategoryObject,
} = require("../helpers/helpers");

let data;

exports.getData = async (req, res) => {
  const endpoint = "https://transactions.spokedev.xyz/transactions";
  Request.get(endpoint, async (error, response, body) => {
    if (error) {
      return console.dir(error);
    }
    data = await JSON.parse(body);
  });
  return data;
};
    this.calculateCategories(data, category)
  );
  const processedData = createCategoryObject(categoryNames, arrayOfObjects);
  res.json(processedData);
};

exports.calculateCategories = (data, categoryName) => {
  const categoryItems = groupCategoryItems(data, categoryName);
  const totalValue = calculateTotalValue(categoryItems);
  const totalNumber = calculateTotalNumber(categoryItems);
  const averageValue = calculateAverageValue(totalValue, totalNumber);
  const categoryObject = createObject(totalNumber, totalValue, averageValue);
  return categoryObject;
};
