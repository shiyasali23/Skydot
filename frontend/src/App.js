import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./Pages/LandingPage/LandingPage";
import HomeScreen from "./Pages/HomePage/HomePage";
import ProductPage from "./Pages/ProductPage/ProductPage";
import CartPage from "./Pages/CartPage/CartPage";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage";
import BlogPage from "./Pages/BlogPage/BlogPage";
import OrdersPage from "./Pages/OrdersPage/OrdersPage";
import PaymentPage from "./Pages/PaymentPage/PaymentPage";
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
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/shirts" element={<HomeScreen category={"shirt"}/>} />
            <Route path="/t-shirts" element={<HomeScreen category={"t-shirt"} />} />
            <Route path="/pants" element={<HomeScreen category={"pants"}/>} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/paymentpage" element={<PaymentPage />} />
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
