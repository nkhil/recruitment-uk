const Request = require("request");
const {
  createUniquePropertiesArray,
  createObject,
  calculateAverageValue,
  calculateTotalNumber,
  calculateTotalValue,
  groupItemsByProperty,
  createCategoryObject,
  formatDate
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

exports.categories = async (req, res) => {
  const data = await this.getData();
  const categoryNames = createUniquePropertiesArray(data || [], "category");
  const arrayOfCategoryObjects = categoryNames.map(category =>
    this.calculateCategories(data, category)
  );
  const processedData = createCategoryObject(
    categoryNames,
    arrayOfCategoryObjects
  );
  res.json(processedData);
};

exports.calculateCategories = (data, categoryName) => {
  const categoryItems = groupItemsByProperty(data, "category", categoryName);
  const totalValue = calculateTotalValue(categoryItems);
  const totalNumber = calculateTotalNumber(categoryItems);
  const averageValue = calculateAverageValue(totalValue, totalNumber);
  const categoryObject = createObject(totalNumber, totalValue, averageValue);
  return categoryObject;
};

exports.cashflow = async (req, res) => {
  const data = await this.getData();
  const paymentDates = createUniquePropertiesArray(data || [], "paymentDate");
  const arrayOfPaymentDateObjects = paymentDates.map(paymentDate =>
    this.calculateCashflow(data, paymentDate)
  );
  const formattedDates = paymentDates.map(paymentDate =>
    formatDate(paymentDate)
  );
  const processedData = createCategoryObject(
    formattedDates,
    arrayOfPaymentDateObjects
  );
  res.json(processedData);
};

exports.calculateCashflow = (data, paymentDate) => {
  const paymentDateItems = groupItemsByProperty(
    data,
    "paymentDate",
    paymentDate
  );
  const totalValue = calculateTotalValue(paymentDateItems);
  const totalNumber = calculateTotalNumber(paymentDateItems);
  const averageValue = calculateAverageValue(totalValue, totalNumber);
  const categoryObject = createObject(totalNumber, totalValue, averageValue);
  return categoryObject;
};
