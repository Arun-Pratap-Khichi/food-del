import React, { useContext, useEffect } from "react";
import "./Verify.css";
import { useNavigate, useSearchParams } from "react-router-dom";
 import { StoreContext } from "../../context/StoreContext";
// import axios from "axios";

const Verify = () => {
  const [searchParams,setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
 const { url } = useContext(StoreContext);
  const navigate = useNavigate();


  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.post(`${url}/api/order/verify`, {
          success,
          orderId,
        });

        if (response.data.success) {
          navigate("/myorders");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        navigate("/");
      }
    };

    if (success !== null && orderId) {
      verifyPayment();
    } else {
      console.error("Missing success or orderId parameter");
      navigate("/");
    }
  }, [success, orderId, url, navigate]);

  return (
    <div className="verify">
      <div className="spinner"></div>
      <p>Verifying payment...</p>
    </div>
  );
};

export default Verify;
