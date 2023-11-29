// ======== > Import Libs
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

// ======== > Import Routes
const adminRoutes = require('./src/routes/admin.router');
const jobRoutes = require('./src/routes/job.router');
const blogRoutes = require('./src/routes/blog.router');
const contactEntryRoutes = require('./src/routes/contactEntry.router');

// ======== > ConfigsService
const app = express();
dotenv.config();

// ======== > Check for env variables
const port = process.env.PORT;
if (!port) {
  console.log('Fix: Add env variables (check documentation)');
  process.exit(1);
}

// ======== > Middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));

// ======== > Route Middlewares
app.use('/api', adminRoutes);
app.use('/api', jobRoutes);
app.use('/api', blogRoutes);
app.use('/api', contactEntryRoutes);

app.listen(port || 5055, () =>
  console.log(`Server running on http://localhost:${port}`)
);
