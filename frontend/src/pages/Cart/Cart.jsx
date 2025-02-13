import React, {useContext,useEffect} from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { calculateDeliveryCost } from "./CalculateDeliveryCost";



const Cart = () => {

  const {cartItems, food_list, removeFromCart,getTotalCartAmount,url} = useContext(StoreContext);

  const totalCartAmount = getTotalCartAmount();
  const deliveryCost =
    totalCartAmount === 0 ? 0 : calculateDeliveryCost(totalCartAmount);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br/>
        <hr/>
        {food_list.map((item,index) => {
          console.log(item.image);
          if(cartItems[item._id]>0){
            return(
<div>
<div className='cart-items-title cart-items-item'>
              <img  src={url+"/images/"+item.image} alt="" />
              <p>{item.name}</p>
              <p>₹{item.price}</p>
              <p>{cartItems[item._id]}</p>
              <p>₹{item.price*cartItems[item._id]}</p>
              <p onClick={()=> removeFromCart(item._id)}  className='cross'>X</p>
             </div>
             <hr/>
</div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>₹{totalCartAmount}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>₹{deliveryCost}</p>
            </div>
            <p className="delivery-condition">
              {totalCartAmount > 499
                ? "Congratulations! You have free delivery."
                : "Add items worth ₹" +
                  (499 - totalCartAmount) +
                  " more for free delivery."}
            </p>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{totalCartAmount + deliveryCost}</b>
            </div>
        </div>
        <button onClick={()=>navigate("/order")}>PROCCED TO CHECKOUT</button>
        </div>
         <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
         <div className="cart-promocode-input">
          <input type="text" placeholder='promo code' />
          <button>Submit</button>
         </div>
          </div>
         </div>
      </div>
    </div>
  )
}

export default Cart
