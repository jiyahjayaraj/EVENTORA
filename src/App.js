import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Trending from "./components/trending";
import Category from "./components/category";
import Smart from "./components/smart";
import Organizer from "./components/organizer";
import Footer from "./components/footer";
import Detail from "./components/details";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Trending />
              <Category />
              <Smart />
              <Organizer />
            </>
          }
        />

        <Route path="/details/:id" element={<Detail />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;