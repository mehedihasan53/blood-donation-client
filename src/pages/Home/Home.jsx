import Banner from "./Banner";
import Featured from "./Featured";
import AboutMission from "./AboutMission";
import ContactUs from "./ContactUs";
import DynamicTitle from "../../components/shared/DynamicTitle";

const Home = () => {
  return (
    <div className="min-h-screen bg-bg-primary backdrop-blur-xl transition-colors duration-300">
      <DynamicTitle title="Home" />
      <Banner />
      <Featured />
      <AboutMission />
      <ContactUs />
    </div>
  );
};

export default Home;
