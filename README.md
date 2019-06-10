# myRetail RESTful service

A RESTful service that can retrieve product and price details by ID

## Technologies Used

* AngularJs
* Node.js
* MongoDB
* Express.js
* Mongoose
* Angular Material

## To run a copy of this on your local machine follow the instructions below

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/download-center/community)

### Installing
* Clone repository from Github.
* Run ```npm install --save```
* Run ```npm install --save-dev nodemon``` for instant server refesh on save
* Open package.json and add "start": "node server/server.js" to the scripts section right below the    "test" line and don't forget the comma after the line above
* Go the the menu on the side of the filestack and click on the bug icon
* Click the gear icon then the  dropdown above and select 'Launch Program' and then select 'Nodejs' from the pop up menu 
* Start mongo ```mongod```
* Run ```nodemon```

## Notes
* switch MONGOURI in ```mongoose-connection.js``` to local 
* Use this for dummy data in local Mongo
{
    id: 13860428,
    title: "The Big Lebowski",
    current_price: {
        value: 15.49,
        currency_code: "USD",
    }
}

## Base Functionality
- [x] Responds to an HTTP GET request at /products/{id} and delivers product data as JSON.
- [x] Performs an HTTP GET to retrieve the product name from an external API
- [x] Reads pricing information from a NoSQL data store and combines it with the product id and name from the HTTP request into a single response

## Stretch Goals
- [ ] Add backend validation to check if product id exists before sending data response

## Screenshots

<a href="https://imgur.com/1kFaFh8"><img src="https://i.imgur.com/1kFaFh8.png" title="source: imgur.com" /></a>
<a href="https://imgur.com/IYGZhlz"><img src="https://i.imgur.com/IYGZhlz.png" title="source: imgur.com" /></a>
<a href="https://imgur.com/KsWiQkm"><img src="https://i.imgur.com/KsWiQkm.png" title="source: imgur.com" /></a>
<a href="https://imgur.com/9ZKxslI"><img src="https://i.imgur.com/9ZKxslI.png" title="source: imgur.com" /></a>
