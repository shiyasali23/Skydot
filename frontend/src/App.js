import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProductPage from "./Pages/ProductPage/ProductPage";
import HomeScreen from "./Pages/HomePage/HomePage";
import CartPage from "./Pages/CartPage/CartPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import BlogPage from "./Pages/BlogPage/BlogPage";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import AccountPage from "./Pages/AccountPage/AccountPage";
import { ProductsProvider } from "./Contexts/ProductsContext";
import { CartProvider } from "./Contexts/CartContext";
import { UserProvider } from "./Contexts/UserContext";

function App() {
  return (
    <div className="App">
  <UserProvider>
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
            <Route path="/account" element={<AccountPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </BrowserRouter>
        </CartProvider>
      </ProductsProvider>
      </UserProvider>
    </div>
  );
}

export default App;
