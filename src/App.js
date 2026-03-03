import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Trending from "./components/trending";
import Category from "./components/category";
import Smart from "./components/smart";
import Organizer from "./components/organizer";
import Footer from "./components/footer";
import Detail from "./components/details";
import PaymentPage from "./components/ticketPayment";

import Entertainment from "./pages/Entertainment";
import Education from "./pages/Education";
import Technology from "./pages/Technology";
import Business from "./pages/Business";
import Sports from "./pages/Sports";
import Art from "./pages/Art";

function App() {

  const [filters, setFilters] = useState({});

  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <>
              <Hero onSearch={setFilters} />
              <Trending filters={filters} />
              <Category />
              <Smart />
              <Organizer />
            </>
          }
        />

        {/* EVENT DETAILS */}
        <Route path="/details/:id" element={<Detail />} />

        {/* PAYMENT */}
        <Route path="/payment" element={<PaymentPage />} />


        {/* CATEGORY PAGES */}
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/education" element={<Education />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/business" element={<Business />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/art" element={<Art />} />


      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;