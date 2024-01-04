import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductPage from "./Pages/ProductPage/ProductPage";
import HomeScreen from "./Pages/HomePage/HomePage";
import CartPage from "./Pages/CartPage/CartPage";
import CheckoutPage from "./Pages/CheckoutPage/CheckoutPage";
import BlogPage from "./Pages/BlogPage/BlogPage";
import OrderPage from "./Pages/OrderPage/OrderPage";
import { ProductsProvider } from "./Contexts/ProductsContext";
import { CartProvider } from "./Contexts/CartContext";
import { GuestProvider } from "./Contexts/GuestContext";

function App() {
  return (
    <div className="App">
  <GuestProvider>
      <ProductsProvider>
        <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/shirts" element={<HomeScreen category={"shirt"}/>} />
            <Route path="/t-shirts" element={<HomeScreen category={"t-shirt"} />} />
            <Route path="/pants" element={<HomeScreen category={"pants"}/>} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="product/:id" element={<ProductPage />} />
            <Route path="/orders" element={<OrderPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </BrowserRouter>
        </CartProvider>
      </ProductsProvider>
      </GuestProvider>
    </div>
  );
}

export default App;
