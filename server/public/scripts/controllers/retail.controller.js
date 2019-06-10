myApp.controller("RetailController", [
  "RetailService",
  "$routeParams",
  "$http",
  function(RetailService, $routeParams, $http) {
    var self = this;

    toastr.options = {
      closeButton: false,
      debug: false,
      newestOnTop: true,
      progressBar: false,
      positionClass: "toast-bottom-right",
      preventDuplicates: false,
      onclick: null,
      showDuration: "300",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut"
    };

    self.isBusy = true;
    self.editData = true;

    // Check product id input
    self.getMovies = function(id) {
      let prodId = id.toString();
      if (prodId.length != 8) {
        toastr.error("Product ID must be 8 characters!");
        self.productID = "";
      } else {
        self.productID = "";
        self.idCheck(id);
      }
    };

    self.editData = function() {
      self.editData = false;
    };

    // Check if ID exists and if it does, pass the id along to the getDetails and getApiMovies
    self.idCheck = function(id) {
      $http({
        method: "GET",
        url: "/movies/products/idCheck/" + id
      }).then(function(response) {
        if (typeof response.data[0] === "undefined") {
          self.productID = "";
          toastr.error("Product ID not found, check Product ID and try again!");
        } else {
          self.getDetails(id);
          self.getApiMovies(id);
          self.getCurrentDateTime();
        }
      });
    };

    // API GET route
    self.getApiMovies = function(id) {
      $http({
        method: "GET",
        url: "/movies/products/api/" + id
      }).then(function(response) {
        let data = response.data.product.item;
        self.apiData = data;
      });
    };

    // Get data from MongoDB Movies Table
    self.getDetails = function(id) {
      console.log(id);
      self.isBusy = false;
      $http({
        method: "GET",
        url: "/movies/products/data_store/" + id
      }).then(function(response) {
        self.productData = response.data[0];
        self.getAllSales(self.productData);
      });
    };

    self.getCurrentDateTime = function() {
      var date = moment.utc().format();
      self.localTime = moment
        .utc(date)
        .local()
        .format();
      console.log(self.localTime);
      return self.localTime;
    };

    // self.getMovies = function() {
    //   self.getDetails(id);
    //   self.getApiMovies(id);
    // };

    // Update price MongoDB
    self.updatePrice = function(id, data) {
      self.editData = true;

      $http({
        method: "PUT",
        url: "/movies/products/" + id,
        data
      }).then(function(response) {
        console.log("data updated", response);
      });
    };

    self.submitSalesData = function(data) {
      console.log("router data", data);

      $http
        .post("/sales/", data)
        .then(function(response) {
          console.log("post response", response);
          self.sales.saleId = "";
          self.sales.productName = "";
          self.sales.saleName = "";
          self.sales.productSaleStartDate = "";
          self.sales.productSaleEndDate = "";
          self.sales.productSalePrice = "";
        })
        .catch(function(response) {
          console.log("error on post", response);
        });
    };

    self.getAllSales = function(currentMoviePrice) {
      console.log(currentMoviePrice);
      $http({
        method: "GET",
        url: "/sales/all_sales/"
      }).then(function(response) {
        console.log(response);
      });
    };
  }
]);
