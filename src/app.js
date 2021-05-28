import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import mrq from 'mongoose-rest-query';
import morgan from 'morgan';
import model from './model/index.js';
import petRouter from './routes/pet.js';
import petController from './controllers/pet.js';

const { restify } = mrq;

const app = express();

mongoose.Promise = global.Promise;
app.use(morgan('tiny'));

app.use(mrq.db);

mrq.config.modelSchemas = model;

app.use(bodyParser.json({
  limit: '100mb',
}));

app.use(bodyParser.raw({
  type: 'binary/octet-stream',
  limit: '10mb',
}));

app.use(express.static('public'));

app.use('/schema/users', restify('UserSchema'));
app.use('/schema/pets', restify('PetSchema'));
app.use('/controller/pet', petRouter(petController));

app.get('/', (req, res) => {
  console.log('Here we go!');
  res.send({});
});

app.listen(5500, () => {
  console.log('Port', 5500);
});
