import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TableContainer,
} from "@mui/material";
import { BodyRow } from "../../styles";

interface IProduct {
  product_code: string;
  new_price: string;
  error?: string[];
  actualPrice?: number;
  name?: string;
}

interface IData {
  data: IProduct[];
}

export const ProductTable = ({ data }: IData) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell style={{ textAlign: "end" }}>Preço atual</TableCell>
            <TableCell style={{ textAlign: "end" }}>Novo preço</TableCell>
            <TableCell>Erros</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((product) => (
            <BodyRow key={product.product_code}>
              <TableCell>{product.product_code}</TableCell>
              <TableCell>{product.name || ""}</TableCell>
              <TableCell style={{ textAlign: "end" }}>
                {product.actualPrice || ""}
              </TableCell>
              <TableCell style={{ textAlign: "end" }}>
                {product.new_price || ""}
              </TableCell>
              <TableCell style={{ color: "red" }}>
                {product.error?.map((err) => <p>{err}</p>) || ""}
              </TableCell>
            </BodyRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
