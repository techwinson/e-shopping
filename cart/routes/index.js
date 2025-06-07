// var express = require('express');
// var router = express.Router();
// var Product=require('../models/product');
// var mongoose=require('mongoose');



// /* GET home page. */
// router.get('/', function(req, res, next) {
//       Product.find(function(err,docs){
//         var productChunks=[];
//         var chunkSize=3;
//         for(var i=0;i<docs.length;i+=chunkSize){
//           productChunks.push(docs.slice(i,i+=chunkSize))
//         }
//       });
//   res.render('index', { title: 'Shopping-Cart' ,products:products});
// });




// module.exports = router;




var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    const docs = await Product.find().lean(); // Use async/await to handle the promise
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize) {
      productChunks.push(docs.slice(i, i + chunkSize)); // Fix slicing logic
    }
    res.render('index', { title: 'Shopping-Cart', products: productChunks });
  } catch (err) {
    next(err); // Pass the error to the Express error handler
  }
});

module.exports = router;
