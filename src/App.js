import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProfileRequest } from "./container/usercontainer/slice";

import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Trending from "./components/trending";
import Category from "./components/category";
import Smart from "./components/smart";
import Organizer from "./components/organizer";
import Footer from "./components/footer";
import Detail from "./components/details";
import PaymentPage from "./components/ticketPayment";
import Recommendations from "./pages/Recommendations";
import ScrollToTop from "./components/ScrollToTop";

// Category pages
import Entertainment from "./pages/Entertainment";
import Education from "./pages/Education";
import Technology from "./pages/Technology";
import Business from "./pages/Business";
import Sports from "./pages/Sports";
import Art from "./pages/Art";
import MyTickets from "./pages/mytickets";
import Profile from "./pages/profile";

function App() {
    const [filters, setFilters] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileRequest());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      {/* NAVBAR ALWAYS VISIBLE */}
      <Navbar />

      <Routes>
        {/* HOME PAGE (SCROLL SECTIONS) */}
        <Route
          path="/"
          element={
            <>
              <section id="hero">
                <Hero onSearch={setFilters} />
              </section>

              <section id="events">
                <Trending filters={filters} />
              </section>

              <section id="categories">
                <Category />
              </section>

              <section >
                <Smart />
              </section>
      
              <section id="organizers">
                <Organizer />
              </section>
            </>
          }
        />

        {/* EVENT DETAILS */}
        <Route path="/details/:id" element={<Detail />} />
        
        {/* RECOMMENDATIONS */}
        <Route path="/recommendations" element={<Recommendations />} />

        {/* PAYMENT */}
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/profile" element={<Profile/>}/>

        {/* CATEGORY PAGES */}
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/education" element={<Education />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/business" element={<Business />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/art" element={<Art />} />
      </Routes>

      {/* FOOTER ALWAYS VISIBLE */}
      <section id="about">
                <Footer />
              </section>
    </BrowserRouter>
  );
}

export default App;