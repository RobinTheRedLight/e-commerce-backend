import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import { ProductRoutes } from './app/modules/product/product.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api', ProductRoutes);

const serverMessage = (req: Request, res: Response) => {
  res.send('Server is connected');
};

app.get('/', serverMessage);

export default app;
