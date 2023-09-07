import { TopBar } from "../../components/TopBar";
import { MainContent } from "../../components/content/MainContent";
import { ButtonContent, Content, Title, VisuallyHiddenInput } from "./styles";
import { Link } from "react-router-dom";
import ShopperLogo from "./../../assets/images/shopper-logo.webp";
import { ShopperButton } from "../../components/ShopperButton";
import { ProductTable } from "./components/ProductsTable";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, ChangeEvent, useRef } from "react";
import { toast } from "react-toastify";
import Papa from "papaparse";
import { productServices } from "../../services/productServices";

interface IProduct {
  product_code: string;
  new_price: string;
  error?: string[];
  actualPrice?: number;
  name?: string;
}

export const UpdatePricesPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [productsData, setProductsData] = useState<IProduct[] | []>([]);
  const [validateStatus, setValidateStatus] = useState("");
  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const validateCSV = async () => {
    try {
      if (selectedFile) {
        const formData = new FormData();
        formData.append("csvFile", selectedFile);

        const { data } = await productServices.validateCSV(formData);
        setValidateStatus(data.status);
        setFileName(data.fileName);
        setProductsData(data.validateData);
        setSelectedFile(null);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        toast.info(data.message);
      } else {
        toast.warn("Nenhum arquivo selecionado");
      }
    } catch (error) {
      toast.error("Erro ao validar preços");
    }
  };

  const updatePrices = async () => {
    try {
      const { data } = await productServices.updatePricesFromCsv({ fileName });

      setValidateStatus("");
      setFileName("");
      setProductsData([]);
      setSelectedFile(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      toast.success(data.message);
    } catch (error) {
      toast.error("Erro ao validar preços");
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setValidateStatus("");
    setFileName("");
    if (file) {
      if (file.type === "text/csv" || file.name.endsWith(".csv")) {
        setSelectedFile(file);
        Papa.parse(file, {
          complete: (result: Papa.ParseResult<IProduct>) => {
            setProductsData(result.data);
          },
          header: true,
          dynamicTyping: true,
        });
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      } else {
        toast.warning("Por favor, selecione um arquivo CSV válido.");
        setSelectedFile(null);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      }
    }
  };

  return (
    <MainContent>
      <TopBar elevation={3} style={{ justifyContent: "space-between" }}>
        <Link to={"/"} style={{ display: "flex" }}>
          <img
            src={ShopperLogo}
            alt="Shopper Logo"
            style={{ width: "8.75rem", height: "2.375rem" }}
          />
        </Link>
        <Title>Atualizar preços</Title>
        <ButtonContent>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
            href="#file-upload"
          >
            CSV
            <VisuallyHiddenInput
              type="file"
              accept=".csv"
              ref={inputRef}
              onChange={handleFileChange}
            />
          </Button>

          <ShopperButton
            variant="contained"
            disabled={!selectedFile}
            onClick={validateCSV}
          >
            Validar
          </ShopperButton>

          <ShopperButton
            variant="contained"
            disabled={validateStatus !== "Success"}
            onClick={updatePrices}
          >
            Atualizar Preços
          </ShopperButton>
        </ButtonContent>
      </TopBar>
      <Content elevation={3}>
        <ProductTable data={productsData} />
      </Content>
    </MainContent>
  );
};
