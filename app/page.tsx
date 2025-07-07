import React from "react";
import Hero from "./Components/Hero";
import OProducts from "./Components/OProducts";
import OFacility from "./Components/OFacility";
import Certificates from "./Components/Certificates";
import Contactus from "./Components/Contactus";

const HomePage = () => {
  return (
    <>
      <Hero />
      <OProducts />
      <OFacility />
      <Certificates />
      <Contactus/>
    </>
  );
};

export default HomePage;
