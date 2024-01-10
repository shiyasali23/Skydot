import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./Pages/LandingPage/LandingPage";
import StorePage from "./Pages/StorePage/StorePage";
import ProductPage from "./Pages/ProductPage/ProductPage";
import CartPage from "./Pages/CartPage/CartPage";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage";
import BlogPage from "./Pages/BlogPage/BlogPage";
import OrdersPage from "./Pages/OrdersPage/OrdersPage";
import { ProductsProvider } from "./Contexts/ProductsContext";
import { CartProvider } from "./Contexts/CartContext";
import { CheckoutProvider } from "./Contexts/CheckoutContext";
import { GuestProvider } from "./Contexts/GuestContext";
import { OrderProvider } from "./Contexts/OrderContext";

function App() {
  return (
    <div className="App">
      <ProductsProvider>
        <CartProvider>
          <CheckoutProvider>
          <OrderProvider>
            <GuestProvider>
            
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/store" element={<StorePage />} />
            <Route path="/shirts" element={<StorePage category={"shirt"}/>} />
            <Route path="/t-shirts" element={<StorePage category={"t-shirt"} />} />
            <Route path="/pants" element={<StorePage category={"pants"}/>} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </BrowserRouter>
        
        </GuestProvider>
        </OrderProvider>
        </CheckoutProvider>
        </CartProvider>
      </ProductsProvider>
    </div>
  );
}

export default App;
