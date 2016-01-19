'use strict';
/*
Import modules/files you may need to correctly run the script.
Make sure to save your DB's uri in the config file, then import it with a require statement!
*/
var fs = require('fs'),
mongoose = require('mongoose'),
Schema = mongoose.Schema,
Listing = require('./ListingSchema.js'),
config = require('./config.js');

/* Connect to your database */
mongoose.connect(config.db.uri);

/*
Instantiate a mongoose model for each listing object in the JSON file,
and then save it to your Mongo database
*/
fs.readFile('./listings.json', 'utf8',
function read(err, data) {
  var listings = JSON.parse(data);
  var length = listings.entries.length;
  var callbackCount = 0;
  for (var i = 0; i < length; i++) {
    var listing = listings.entries[i];

    var newListing = new Listing({
      name: listing.name,
      code: listing.code,
      coordinates: listing.coordinates,
      address: listing.address
    });
    console.log(newListing.name);
    newListing.save(
      function(err, listing) {
        if (err) throw err;
        if(++callbackCount == length) {
          mongoose.disconnect();
        }
      }
    );
  }
});
/*
Once you've written + run the script, check out your MongoLab database to ensure that
it saved everything correctly.
*/
