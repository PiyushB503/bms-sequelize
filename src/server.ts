import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { dbConnect, sequelize } from './database/db';  // Import db connection
import './association/association';  // Import associations
import bookRouter from "./routes/book-route";
import authorRouter from './routes/author-route';
import categoryRouter from './routes/category-route';
import expressStatusMonitor from 'express-status-monitor';

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 8088;

// Middleware
app.use(express.json());
app.use(expressStatusMonitor());

// API Routes
app.use("/api/v1/book", bookRouter); 
app.use('/api/v1/author', authorRouter);
app.use('/api/v1/category', categoryRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Home');
});

// Database Synchronization (Make sure this is done before starting the server)
(async () => {
  try {
    // Authenticate Sequelize connection
    await dbConnect();
    console.log("Database connection established successfully.");

    // Sync all models with the database (without force-recreating the tables)
    await sequelize.sync({ force: false });
    console.log('Database synchronized successfully.');

    // Start the server after DB sync
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error while connecting to the database or syncing models:', error);
  }
})();
