import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MainLayout = () => {
  return (
    <Container>
      <ToastContainer />
      <Outlet />
    </Container>
  );
};
