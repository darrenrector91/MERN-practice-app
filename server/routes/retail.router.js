var express = require("express");
var router = express.Router();
var MyRetail = require("../models/myretail.schema");
var RetailSales = require("../models/retailsales.schema");
var request = require("request");

// POST route
router.post("/", (req, res, next) => {
  console.log("data to save: ", req.body);
  var post = new RetailSales({
    sale_id: req.body.saleId,
    product_name: req.body.productName,
    sale_name: req.body.saleName,
    sale_start_date: req.body.productSaleStartDate,
    sale_end_date: req.body.productSaleEndDate,
    sale_price: req.body.productSalePrice
  });
  post.save(function(err, post) {
    if (err) {
      return next(err);
    }
    res.status(201, post);
  });
}); // end post route

// GET route
router.get("/all_sales", (req, res) => {
  RetailSales.find({}, (error, foundSales) => {
    if (error) {
      console.log("error on find: ", error);
      res.sendStatus(500);
    } else {
      console.log("found game Documents: ", foundSales);

      res.send(foundSales);
    }
  }); // end find
}); // end route

router.get("/products/idCheck/:id", function(req, res) {
  MyRetail.find({ id: req.params.id }, function(databaseQueryError, data) {
    if (databaseQueryError) {
      console.log("database query error", databaseQueryError);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

// GET route
router.get("/prices/", (req, res) => {
  MyRetail.find({}, (error, foundSales) => {
    if (error) {
      console.log("error on find: ", error);
      res.sendStatus(500);
    } else {
      console.log("found sales Documents: ", foundSales);
      res.send(foundSales);
    }
  }); // end find
}); // end route

// Data route to API
router.get("/products/api/:id", function(req, res) {
  var apiURL =
    "http://redsky.target.com/v2/pdp/tcin/13860428?excludes=taxonomy,price,promotion,bulk_ship,rating_and_review_reviews,rating_and_review_statistics,question_answer_statistics";

  request(apiURL, function(error, data, body) {
    if (error) {
      console.log("error making Redsky API request", error);
      res.sendStatus(500);
    } else {
      res.send(body);
    }
  });
}); // End route to API

// GET route to Mongo
router.get("/products/data_store/:id", function(req, res) {
  MyRetail.find({ id: req.params.id }, function(databaseQueryError, data) {
    if (databaseQueryError) {
      console.log("database query error", databaseQueryError);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
}); // End GET route to Mongo

// UPDATE/PUT route to Mongo
router.put("/products/:id", function(req, res) {
  MyRetail.updateOne(
    { id: req.params.id },
    {
      $set: {
        current_price: {
          currency_code: req.body.current_price.currency_code,
          value: req.body.current_price.value
        }
      }
    },
    function(err, productFound) {
      if (err) {
        console.log("Error received updating product.", err);
        res.sendStatus(500);
      } else {
        res.sendStatus(204);
      }
    }
  );
}); // End UPDATE/PUT route to Mongo

module.exports = router;
