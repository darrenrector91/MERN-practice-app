function connect() {
  var mongoose = require("mongoose");

  // Mongo Connection //
  var mongoURI = "";
  // process.env.MONGODB_URI will only be defined if you
  // are running on Heroku
  if (process.env.MONGODB_URI != undefined) {
    // use the string value of the environment variable
    mongoURI = process.env.MONGODB_URI;
  } else {
    // use the local database server
    //mongoURI = "mongodb://localhost:27017/movies";
    mongoURI =
      "mongodb://darrenrector91:B00ne55428@ds047355.mlab.com:47355/my_retail_api_app";
  }

  mongoose.connect(mongoURI, {
    useNewUrlParser: true
  });

  mongoose.connection.on("error", function(response, err) {
    if (err) {
      console.log("MONGO ERROR: ", err);
    }
    response.sendStatus(500);
  });

  mongoose.connection.on("open", function() {
    console.log("Connected to Mongo!");
  });
}

module.exports = {
  connect: connect
};
