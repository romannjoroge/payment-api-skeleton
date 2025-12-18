import Express  from "express";
import "dotenv/config";
import logger from "./lib/logger";

const app = Express();
import transactionsRouter from "./routes/transactions";

app.use("/", Express.json())
app.use("/transactions", transactionsRouter);

if (!process.env.PORT) {
    throw new Error("Invalid env setup, set PORT in env variables")
}
const PORT = process.env.PORT;

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}....`)
})
