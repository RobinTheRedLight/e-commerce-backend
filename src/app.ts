import cors from 'cors';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.use(express.json());
app.use(cors());

const serverMessage = (req: Request, res: Response) => {
  res.send('Server is connected');
};

app.get('/', serverMessage);

export default app;
