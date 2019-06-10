require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var mongooseConnection = require("./modules/mongoose-connection");
var movies = require("./routes/retail.router");
var sales = require("./routes/retail.router");
var app = express();

// PORT
var port = process.env.PORT || 8080;

// MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("server/public"));
mongooseConnection.connect();

// EXPRESS ROUTES
app.use("/movies/", movies);
app.use("/sales/", sales);

// PORT LISTENING
app.listen(port, function() {
  console.log("listening on port", port);
});
