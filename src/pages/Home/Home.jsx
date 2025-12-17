import React from "react";
import Banner from "./Banner";
import Featured from "./Featured";
import ContactUs from "./ContactUs";

const Home = () => {
  return (
    <div className="min-h-screen bg-red-50">
      <Banner />
      <Featured />
      <ContactUs />
    </div>
  );
};

export default Home;
