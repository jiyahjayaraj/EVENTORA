import "./hero.css";
import { useState, useEffect } from "react";

const Hero = ({ onSearch }) => {

  const [searchText, setSearchText] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const [isSearching, setIsSearching] = useState(false);


  /* LIVE SEARCH */
  useEffect(() => {

    onSearch({
      searchText,
      location,
      date
    });

    if (searchText || location || date) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }

  }, [searchText, location, date]);


  return (

    <section
      className={`hero ${isSearching ? "hero-searching" : ""}`}
      style={{
        backgroundImage: "url('/pph.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      <div className="hero-overlay"></div>

      <div className="hero-content">

        <h1 className={isSearching ? "hide-title" : ""}>
          Discover Events That <br />
          <span>Move You</span>
        </h1>


        <div className={`hero-search ${isSearching ? "search-top" : ""}`}>

          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass"></i>

            <input
              placeholder="Search events"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>


          <div className="search-box">
            <i className="fa-solid fa-location-dot"></i>

            <input
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>


          <div className="search-box">
            <i className="fa-solid fa-calendar"></i>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;