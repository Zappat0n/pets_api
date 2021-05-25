var express = require('express'),
bodyparser = require('body-parser'),
mongoose = require('mongoose'),
mrq = require('mongoose-rest-query'),
restify = mrq.restify,
app = express();

mongoose.Promise = global.Promise;
app.use(require('morgan')('tiny'));
app.use(mrq.db);

mrq.config.modelSchemas = require('./model');

app.use(bodyparser.json({
  limit: '100mb'
}));

app.use(bodyparser.raw({
  type: 'binary/octet-stream',
  limit: '10mb'
}));

app.use(express.static('public'));

app.use('/schema/users', restify('UserSchema'));
app.use('/schema/pets', restify('PetSchema'));
app.post('/controller/createPet/:id', require('./controllers/pet'));

app.get('/', function(req,res) {
  console.log('Here we go!');
  res.send({});
})

var server = app.listen(5500, function(){
  console.log('Port', 5500);
});
