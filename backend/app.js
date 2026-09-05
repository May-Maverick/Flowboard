import express from "express";
import signupRouter from "./routes/signupRoute.js";
import errorHandler from "./middleware/errorHandler.js";
import loginRouter from "./routes/loginRoute.js";

const app = express();

app.use(express.json());

app.use("/signup", signupRouter);

app.use("/login", loginRouter);

app.use(errorHandler)

export default app;