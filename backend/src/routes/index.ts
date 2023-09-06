import { Router } from "express";
import { productsRouter } from "./productsRoutes";

const router = Router();

router.use("/api/products", productsRouter);

export { router };
