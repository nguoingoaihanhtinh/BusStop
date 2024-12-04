import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import HomePage from "../pages/HomePage/HomePage";

import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import SearchPage from "../pages/SearchPage/SearchPage";
import TicketDetail from "../pages/TicketDetail/TicketDetail";
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import InvoicePage from "../pages/Invoice/InvoicePage";



const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="*" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage/>} />
        <Route path="ticket/:ticketId" element={<TicketDetail/>} />
        <Route path="checkout" element={<CheckoutPage/>} />
        <Route path="invoice" element={<InvoicePage/>} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Route>
  )
);
export default Router;
