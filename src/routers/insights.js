const express = require("express");
const router = express.Router();
const { catchErrors } = require("../helpers/helpers");
const insightsController = require("../controllers/insightsController");

router.get("/categories", catchErrors(insightsController.categories));

router.get("/cashflow", async (req, res, next) => {
  try {
    res.status(501).json({ message: "Not Implemented" });
  } catch (err) {
    return next(err);
  }
});

router.get("/merchants", async (req, res, next) => {
  try {
    res.status(501).json({ message: "Not Implemented" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
