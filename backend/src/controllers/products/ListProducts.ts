import { Request, Response } from "express";
import { getAllProducts } from "../../services/products";

export const listProductsController = async (req: Request, res: Response) => {
  const products = await getAllProducts();

  const serializedProducts = products.map((product) => ({
    ...product,
    code: product.code.toString(),
  }));

  return res.json(serializedProducts);
};
