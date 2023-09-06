import { PrismaClient } from "@prisma/client";
import { ICsvPrices } from "../../interfaces/Products";

const prisma = new PrismaClient();

export const getProductByCode = async ({ code }: { code: number }) => {
  try {
    const findByCode = await prisma.products.findUnique({
      where: {
        code: code,
      },
    });
    return findByCode;
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts = async () => {
  const products = await prisma.products.findMany();
  return products;
};

export const updateProductPrice = async (data: ICsvPrices) => {
  const { product_code, new_price } = data;

  try {
    const updatedProduct = await prisma.products.update({
      where: { code: Number(product_code) },
      data: {
        sales_price: new_price,
      },
    });

    return updatedProduct;
  } catch (error) {
    throw new Error(`Erro ao atualizar o preço do produto: ${error}`);
  }
};
