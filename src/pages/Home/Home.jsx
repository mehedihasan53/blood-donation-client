import React from "react";
import Banner from "./Banner";
import Featured from "./Featured";
import ContactUs from "./ContactUs";
import DynamicTitle from "../../components/shared/DynamicTitle";

const Home = () => {
  return (
    <div className="min-h-screen bg-red-50">
      <DynamicTitle title="Home" />
      <Banner />
      <Featured />
      <ContactUs />
    </div>
  );
};

export default Home;
