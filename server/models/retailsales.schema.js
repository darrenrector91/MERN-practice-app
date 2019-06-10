var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);

// new Schema
var retailSalesSchema = new Schema({
  sale_id: { type: Number },
  product_name: {
    type: String
  },
  sale_name: { type: String, required: true },
  sale_start_date: { type: Date, required: true },
  sale_end_date: { type: Date, required: true },
  sale_price: { type: Number }
});

module.exports = mongoose.model("Sale", retailSalesSchema);
