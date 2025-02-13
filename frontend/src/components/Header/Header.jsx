import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <video className="header-video" autoPlay muted loop >
        <source src="/headervideo.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      <div className="header-contents">
        <h2>Swad Bhari Seva, Turant Aapke Darwaze Par!</h2>
        <p>
          Craving a hearty meal? Experience the perfect blend of taste and
          convenience with our rapid delivery service. Indulge in deliciousness
          <br /> - order with Zaikaa today!
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;
