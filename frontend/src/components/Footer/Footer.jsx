import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.log} alt="" />
          <p>
            At Zaikaa, we’re dedicated to delivering hot, fresh, and delicious
            local meals right to your door. Whether you're craving comfort food
            or something new, our quick and reliable service ensures you get the
            best dining experience at home.
          </p>
          <div className="footer-social-icon">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+91-6261862132</li>
            <li>contactus@zaikaa.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">© 2025 Zaikaa. All Rights Reserved.</p>
    </div>
  );
};

export default Footer;
