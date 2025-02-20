import React from "react";
import { Link } from "react-router-dom";

const CustomButton = ({
  to = '/',
  title = '',
  className = ''
}) => {
  return (
    <Link
      to={to}
      className={`rounded-md font-semibold transition-all duration-300 ${className}`}
    >
      {title}
    </Link>
  );
};

export default CustomButton;
