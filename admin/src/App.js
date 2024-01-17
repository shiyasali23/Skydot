import { BrowserRouter, Routes, Route } from "react-router-dom";
import './bootstrap.min.css'

import LoginPage from "./Pages/LoginPage";
import ProductsPage from './Pages/ProductsPage.jsx'
import OrdersPage from "./Pages/OrdersPage";
import AddProductsPage from "./Pages/AddProductsPage";
import ManageOrders from "./Pages/ManageOrders";
import DashboardPage from "./Pages/DashboardPage";
import EditProductPage from "./Pages/EditProductPage";

import { ProductsProvider } from "./Contexts/ProductsContext";
import { OrdersProvider } from "./Contexts/OrdersContext.js";

function App() {
  return (
    <div className="App">

      <ProductsProvider>
      <OrdersProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<OrdersPage />} />
            <Route path="/manage-orders/:id" element={<ManageOrders />} />

            <Route path="/products" element={<ProductsPage />} />
            <Route path="/edit-product/:id" element={<EditProductPage />} />
            <Route path="/add-products" element={<AddProductsPage />} />
           
            <Route path="/dashboard" element={<DashboardPage />} />

          </Routes>
        </BrowserRouter>
        </OrdersProvider>
        </ProductsProvider>
    </div>
  );
}

export default App;
