import { useState } from "react";
import { toast } from "react-toastify";
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  LinearProgress,
  TableContainer,
} from "@mui/material";
import { productServices } from "./../../../../services/productServices";
import { useEffect } from "react";
import { BodyRow } from "../../styles";

interface IProduct {
  code: number;
  name: string;
  cost_price: string;
  sales_price: string;
}

export const ProductTable = () => {
  const [loading, setLoading] = useState(false);
  const [productsData, setProductsData] = useState<IProduct[] | []>([]);

  const getProducts = async () => {
    try {
      setLoading(true);
      const { data } = await productServices.getAllProducts();
      setProductsData(data);
    } catch (error) {
      toast.error("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <TableContainer>
      {loading && <LinearProgress color="success" />}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell style={{ textAlign: "end" }}>Preço de custo</TableCell>
            <TableCell style={{ textAlign: "end" }}>Preço de Venda</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productsData.map((product) => (
            <BodyRow key={product.code}>
              <TableCell>{product.code}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell style={{ textAlign: "end" }}>
                {product.cost_price}
              </TableCell>
              <TableCell style={{ textAlign: "end" }}>
                {product.sales_price}
              </TableCell>
            </BodyRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
