var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

//config
var app = express();
app.set('port', process.env.PORT || 3000);

//middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    { extended: true }
));


//setup db
mongoose.connect('mongodb://localhost/demodb');


//routes
var obj = [
    {id: 1, name: 'david'},
    {id: 2, name: 'joris'},
    {id: 3, name: 'seeger'}
]

//mongo DB make product (constructor)
var Product = mongoose.model('Product', {
    name: String,
    price: Number
});

// var product = new Product({
//     name: 'iPhone 6s',
//     price: 800
// });

// var product = new Product({
//     name: 'OnePlus',
//     price: 400
// });

app.get('/api/users', function(req, res, next) {
    return res.status(200).send(obj);
});

app.get('/api/products', function(req, res, next) {
    Product.find(function(err, products) {
        if(err) {
            return console.log(err)
        }
        res.status(200).send(products);
    });
});

app.get('/api/products/:id', function(req, res) {
    Product.findOne({_id: req.params.id}, function(err, product) {
        if(!product) {
            return res.status(404).send('resource not found');
        }
        res.status(200).send(product);
    });
});

app.post('/api/products', function(req, res, next) {
    var product = new Product({
        name: req.body.name,
        price: req.body.price
    });
    console.log("1:" + product);
    product.save(function(err) {
        console.log("2:" + product);
        res.status(201).send(product);
    });
});

/*product.save(function(err){
    if(err) {
        return console.log('failed');
    }
    console.log('saved');
});*/

//
//listen
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port: '
                    + server.address().port);
});
