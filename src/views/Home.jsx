import React from "react";
import CustomText from "../components/reusable/CustomText";
import CustomButton from "../components/reusable/CustomButton";
import { ROUTES } from "../model/static";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-600 h-screen flex flex-col items-center justify-center">
      <h1 className="font-semibold text-4xl text-white">
        <CustomText
          text="Welcome to the Website"
          delay={150}
          animateBy="words"
          direction="top"
          className="text-3xl md:text-5xl lg:text-7xl"
        />
      </h1>
      <p className="text-white max-w-sm md:max-w-lg lg:max-w-2xl text-center py-10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        metus nunc, congue ut euismod vel, pretium vel diam. Ut diam sapien,
        vestibulum vel ante eget, fermentum eleifend felis.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center items-center">
        <CustomButton
          to={ROUTES.LOGIN}
          title="LOGIN"
          className="py-2 w-32 text-xl bg-blue-500 text-white hover:bg-blue-700 hover:text-gray-200"
        />
        <CustomButton
          to={ROUTES.REGISTER}
          title="REGISTER"
          className="py-2 w-32 text-xl bg-white text-blue-500 border-2 border-blue-700 hover:bg-blue-700 hover:text-gray-200"
        />
      </div>
    </div>
  );
};

export default Home;
