import express from "express";
import signupRouter from "./routes/signupRoute.js";
import errorHandler from "./middleware/errorHandler.js";
import loginRouter from "./routes/loginRoute.js";
import authMiddleware from "./middleware/authMiddleware.js";
import cardRouter from "./routes/cardRoute.js";
import columnRouter from "./routes/columnRoute.js";
import boardRouter from "./routes/boardRoute.js";
import workspaceRouter from "./routes/workspaceRoute.js";
import asyncHandler from "./middleware/asyncHander.js";

const app = express();

app.use(express.json());

app.use("/signup", signupRouter);

app.use("/login", loginRouter);

app.use(asyncHandler(authMiddleware));

app.use("/card", cardRouter);

app.use("/column", columnRouter);

app.use("/board", boardRouter);

app.use("/workspace", workspaceRouter);

app.use(errorHandler)

export default app;