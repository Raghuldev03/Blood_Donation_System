import React from "react";
import Heros from "../components/Heros";
import Benifits from "../components/benifits";
import About from "../components/about";
import Footer from "../components/footer";
function Home() {
  return (
    <div>
      <Heros />
      <Benifits />
      <About />
      <Footer />
    </div>
  );
}
export default Home;
