import React from "react";

const Preloader = (style) => {
  return (
    <div className={style.preloaderStyle}>
      <div className="preloader">
        <div className="item-1" />
        <div className="item-2" />
        <div className="item-3" />
        <div className="item-4" />
        <div className="item-5" />
      </div>
    </div>
  );
};

export default Preloader;
