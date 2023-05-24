import express from 'express';
import indexRouter from '../routes/index.js';
import mongoose from 'mongoose';


const mongoHost = process.env.MONGO_HOST || 'localhost';
const mongoPort = process.env.MONGO_PORT || 27017;
const mongoDb = process.env.MONGO_DB || 'my-database';

const mongoUri = `mongodb://${mongoHost}:${mongoPort}/${mongoDb}`;
const options: any = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(mongoUri, options)
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => console.log('Error connecting database', err.message));


const app: express.Application = express();

// on charge l'ensemble de nos routes
app.use('/', indexRouter);

const port: number = 3000;

app.listen(port, () => {
  console.log(`TypeScript with Express !
		http://localhost:${port}/`);
});

export default app