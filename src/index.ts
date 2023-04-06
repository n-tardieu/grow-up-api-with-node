import express from 'express';
import indexRouter from '../routes/index.js';

const app: express.Application = express();

// on charge l'ensemble de nos routes
app.use('/', indexRouter);

const port: number = 3000;

app.listen(port, () => {
    console.log(`TypeScript with Express !
		http://localhost:${port}/`);
});