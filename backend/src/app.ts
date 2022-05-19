import * as express from 'express';
import * as cors from 'cors';
import routes from './routes';
import 'express-async-errors';
import { errorMid } from './middlewares';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/', routes);

app.use(errorMid);

export default app;
