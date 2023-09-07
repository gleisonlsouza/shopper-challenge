import { api } from "./api/index";

const getAllProducts = async () => {
  const url = "/products";
  return await api.get(url);
};

const validateCSV = async (data: any) => {
  const url = "/products/validate-csv";
  return await api.post(url, data);
};

const updatePricesFromCsv = async (data: { fileName: string }) => {
  const url = "/products/update-prices-from-csv";
  return await api.post(url, data);
};

export const productServices = {
  getAllProducts,
  validateCSV,
  updatePricesFromCsv,
};
