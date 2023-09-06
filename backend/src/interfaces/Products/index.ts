export interface ICsvPrices {
  product_code: string;
  name?: string;
  actualPrice?: number;
  new_price: string;
  error?: string[];
}
