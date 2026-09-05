import express from "express";
import signupRouter from "./routes/signupRoute.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/signup", signupRouter);

app.use(errorHandler)

export default app;