import express, { ErrorRequestHandler } from "express";
import { authRoutes } from "./routes/auth.route";
import { errorMiddleware } from "./middlewares/error-handler.middleware";
import { productRoutes } from "./routes/products.route";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.originalUrl} ${req.method}`);
  next();
});

app.listen(3000, () => console.log("server runs.."));

app.get("/healthz", (req, res) => res.send("server runs..."));
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

// error handler
app.use("*", (req, res) => {
  throw new Error(
    `endpoint not found for path ${req.originalUrl} and method ${req.method}`
  );
});
app.use(errorMiddleware);
