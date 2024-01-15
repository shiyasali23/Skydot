import { BrowserRouter, Routes, Route } from "react-router-dom";
import './bootstrap.min.css'

import LoginPage from "./Pages/LoginPage";
import ProductsPage from "./Pages/Productspage";
import OrdersPage from "./Pages/OrdersPage";
import AddProductsPage from "./Pages/AddProductsPage";
import ManageOrders from "./Pages/ManageOrders";
import DashboardPage from "./Pages/DashboardPage";
import EditProductPage from "./Pages/EditProductPage";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<OrdersPage />} />
            <Route path="/add-orders" element={<ManageOrders />} />

            <Route path="/products" element={<ProductsPage />} />
            <Route path="/add-products" element={<AddProductsPage />} />
            <Route path="/edit-product" element={<EditProductPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />

          </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
