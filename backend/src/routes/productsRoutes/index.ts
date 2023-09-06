import { Router } from "express";
const productsRouter = Router();
import multer from "multer";

import { listProductsController } from "../../controllers/products/ListProducts";
import { validateCSVFileController } from "../../controllers/products/ValidateCSVFileController";
import { updatePricesFromCSV } from "../../controllers/products/UpdatePricesFromCSVController";

const upload = multer({ dest: "uploads/" });

productsRouter.get("/", listProductsController);

productsRouter.post(
  "/validate-csv",
  upload.single("csvFile"),
  validateCSVFileController
);

productsRouter.post("/update-prices-from-csv", updatePricesFromCSV);

export { productsRouter };
