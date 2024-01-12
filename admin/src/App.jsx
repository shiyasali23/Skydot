import { BrowserRouter, Routes, Route } from "react-router-dom";
import './assets/bootstrap.min.css'

import LoginPage from "./Pages/LoginPage";
import Homepage from "./Pages/Homepage";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Homepage />} />

          </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
