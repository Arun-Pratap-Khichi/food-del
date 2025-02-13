import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import { calculateDeliveryCost } from "../Cart/CalculateDeliveryCost";
import axios from "axios";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const totalCartAmount = getTotalCartAmount();
  const deliveryCost =
    totalCartAmount === 0 ? 0 : calculateDeliveryCost(totalCartAmount);

  const navigate = useNavigate();

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      let itemInfo = { ...item }; // Create a copy of the item object
      if (cartItems[item._id] > 0) {
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo); // Only push itemInfo if it has a quantity
      }
    });

    // genereate order data

    let orderData = {
      address: data,
      items: orderItems,
      amount: totalCartAmount + deliveryCost,
    };
    // send the order data to our api
    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    }); // url = backend url

    if (response.data.success) {
      // using this we get the session url
      const { session_url } = response.data;
      window.location.replace(session_url); //sending user session url
    } else {
      alert("Error");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      {
        navigate("/cart");
      }
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            value={data.firstName}
            type="text"
            placeholder="First Name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            value={data.lastName}
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          value={data.email}
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          value={data.street}
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            value={data.city}
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            value={data.state}
            type="text"
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            value={data.zipcode}
            type="text"
            placeholder="Zip Code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            value={data.country}
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          value={data.phone}
          type="text"
          placeholder="Phone"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹ {totalCartAmount}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹ {deliveryCost}</p>
            </div>
            <p className="delivery-condition">
              {totalCartAmount > 499
                ? "Congratulations! You have free delivery."
                : "Add items worth ₹" +
                  (499 - totalCartAmount) +
                  " more for free delivery."}
            </p>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹ {totalCartAmount + deliveryCost}</b>
            </div>
          </div>
          <button type="submit">PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
