import { TopBar } from "../../components/TopBar";
import { MainContent } from "../../components/content/MainContent";
import { ButtonContent, Content, Title } from "./styles";
import { Link } from "react-router-dom";
import ShopperLogo from "./../../assets/images/shopper-logo.webp";
import { ShopperButton } from "../../components/ShopperButton";
import { ProductTable } from "./components/ProductsTable";

export const HomePage = () => {
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
        <Title>Produtos</Title>
        <ButtonContent>
          <Link to={"/update-price"} style={{ display: "flex" }}>
            <ShopperButton variant="contained">Atualizar preços</ShopperButton>
          </Link>
        </ButtonContent>
      </TopBar>
      <Content elevation={3}>
        <ProductTable />
      </Content>
    </MainContent>
  );
};
