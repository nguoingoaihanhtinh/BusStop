import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import HomePage from "../pages/HomePage/HomePage";

import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import SearchPage from "../pages/SearchPage/SearchPage";



const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="*" element={<UserLayout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage/>} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
    </Route>
  )
);
export default Router;
