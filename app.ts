// Import Libs
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

import { postTestData } from './src/db/db';

// Configs
const app = express();
dotenv.config();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  console.log('run')
  postTestData();
  res.json({ success: true });
});

app.listen(process.env.PORT || 4000, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
