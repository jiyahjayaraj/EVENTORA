import Category from "./components/category";
import Navbar from "./components/navbar";

import Hero from "./components/hero";
import Trending from "./components/trending";
import Organizer from "./components/organizer";
import Footer from "./components/footer";
import Smart from "./components/smart";

function App() {
  return(
  <>
  <Navbar />

  
  <Hero/>
  <Trending/>
  <Category/>
    <Smart/>
    <Organizer/>
    <Footer/>
  </> 
  )
}
export default App;


