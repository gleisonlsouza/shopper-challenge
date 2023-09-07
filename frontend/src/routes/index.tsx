import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "../components/layout";
import { HomePage } from "../pages/Home";
import { UpdatePricesPage } from "../pages/UpdatePrices";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/update-price", element: <UpdatePricesPage /> },
    ],
  },
]);
