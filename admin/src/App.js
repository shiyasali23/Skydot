import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./bootstrap.min.css";

import LoginPage from "./Pages/LoginPage";
import ProductsPage from "./Pages/ProductsPage.jsx";
import OrdersPage from "./Pages/OrdersPage";
import ManageOrders from "./Pages/ManageOrdersPage.jsx";
import DashboardPage from "./Pages/DashboardPage";
import ManageProductPage from "./Pages/ManageProductPage";

import { ProductsProvider } from "./Contexts/ProductsContext";
import { OrdersProvider } from "./Contexts/OrdersContext.js";
import { AdminProvider } from "./Contexts/AuthenticationContext.js";

function App() {
  return (
    <div className="App">
      <ProductsProvider>
        <OrdersProvider>
          <AdminProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/manage-orders/:id" element={<ManageOrders />} />

                <Route path="/products" element={<ProductsPage />} />
                <Route
                  path="/edit-product/:id"
                  element={<ManageProductPage />}
                />
                <Route path="/add-product" element={<ManageProductPage />} />

                <Route path="/dashboard" element={<DashboardPage />} />
              </Routes>
            </BrowserRouter>
          </AdminProvider>
        </OrdersProvider>
      </ProductsProvider>
    </div>
  );
}

export default App;
