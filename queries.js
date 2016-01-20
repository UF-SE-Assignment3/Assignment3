'use strict';

var fs = require('fs'),
mongoose = require('mongoose'),
Schema = mongoose.Schema,
Listing = require('./ListingSchema.js'),
config = require('./config.js');

mongoose.connect(config.db.uri);

var callBackCount = 0;

var disconnectDB = function() {
  if (++callBackCount == 4) mongoose.disconnect();
};

/* Fill out these functions using Mongoose queries*/

var findLibraryWest = function() {
  /*
    Find the document that contains data corresponding to Library West,
    then log it to the console.
   */
   Listing.find({name: 'Library West' }).exec(function(err, listing) {
     if (err) throw err;
     console.log(listing);
     disconnectDB();
   });
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console.
   */
   Listing.findOneAndRemove({code: 'CABL'}, function(err, listing){
      if(err) throw err;
      console.log('Removed CABL\n\n');
      disconnectDB();
    });
};
var updatePhelpsMemorial = function() {
  /*
    Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then
    log the updated document to the console.
   */
   // Coordinates from google maps
   Listing.findOneAndUpdate(
     {code: 'PHL'},
     {address: 'Phelps Lab, Gainesville, FL 32611', latitude: '29.644863', longitude: '-82.348820'},
     function(err,listing){
       if(err) throw err;
       console.log("Updated Phelps Lab address\n\n");
       console.log(listing);
       disconnectDB();
     });
};
var retrieveAllListings = function() {
  /*
    Retrieve all listings in the database, and log them to the console.
   */
   Listing.find({}, function(err, listings){
     if(err) throw err;

     console.log('All Listings:\n\n');
     console.log(listings);
     disconnectDB();
   });
};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();
//mongoose.disconnect();
