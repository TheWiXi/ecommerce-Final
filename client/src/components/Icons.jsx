import React from "react";

const Icons = ({ svgUrl, className }) => {
  return (
    <div className="bg-graySearch w-8 h-8 flex items-center justify-center rounded-full">
      <img src={svgUrl} alt="" className={`${className}`} />
    </div>
  );
};

export default Icons;
