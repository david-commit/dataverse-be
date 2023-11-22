// Import Libs
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

// Configs
const app = express();
dotenv.config();

// Check for variables
const port = process.env.PORT
if (!port) {
  console.log('Fix: Add env variables (check documentation)');
  process.exit(1);
}

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
  res.json({ success: true });
});

app.listen(port || 5055, () =>
  console.log(`Server running on http://localhost:${port}`)
);
