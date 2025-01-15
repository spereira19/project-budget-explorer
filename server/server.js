import express from 'express';
import cors from 'cors'
import userRouter from "./routes/user.js"
import categoryRouter from "./routes/category.js";
import projectRouter from "./routes/project.js";
import transactionRouter from './routes/transaction.js';

import connectToDB from './db/connection.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
app.use(cors());

app.use(express.json());
connectToDB()

app.use(express.json()); //?Pass incoming json data
app.use("/", userRouter);
app.use("/", categoryRouter);
app.use("/", projectRouter);
app.use("/", transactionRouter);

app.get('/', (req, res) => {
  res.send('Hello!');
});
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
