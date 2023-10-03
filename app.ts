// Import Libs
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Configs
const app = express();
dotenv.config();

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.get('/', (req, res) => {
  res.json({ success: true });
});

app.listen(process.env.PORT || 4000, () =>
  console.log(`Server running on http://localhost:${process.env.PORT}`)
);
