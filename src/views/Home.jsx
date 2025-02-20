import React from "react";
import Navbar from "../components/navbar/Navbar";
import CustomText from "../components/reusable/CustomText";

const Home = () => {
  return (
    <>
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div className="bg-black h-screen flex items-center justify-center">
        <div>
          <h1 className="font-semibold text-4xl text-white">
            <CustomText
              text="Welcome to the Website"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-3xl md:text-5xl lg:text-7xl"
            />
          </h1>
        </div>
      </div>
    </>
  );
};

export default Home;
