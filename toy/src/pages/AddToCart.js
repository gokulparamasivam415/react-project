import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/addtocart.css'; // Make sure this path is correct

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items from db.json on component mount
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/cartItems');
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  // Function to increment quantity
  const incrementQuantity = async (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity++;
  
    try {
      await axios.put('http://localhost:3001/cartItems/${updatedCartItems[index].id}, updatedCartItems[index]');
      const response = await axios.get('http://localhost:3001/cartItems');
      setCartItems(response.data);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Function to decrement quantity
  const decrementQuantity = async (index) => {
    const updatedCartItems = [...cartItems];

    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity -= 1;
      setCartItems(updatedCartItems);

      try {
        await axios.put('http://localhost:3001/cartItems/${updatedCartItems[index].id}, updatedCartItems[index]');
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  // Calculate total amount
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  //handlePurchase
  const handlePurchase = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items to purchase.");
      return;
    }

    try {
      // Prepare the purchase data
      const purchaseData = {
        purchasedItems: cartItems,
        totalAmount: totalAmount,
        purchaseDate: new Date().toISOString(),
      };

      // Send the purchase data to the 'purchase' section in db.json
      await axios.post('http://localhost:3001/purchase', purchaseData);

      // Clear the cart both in the state and the db.json
      await Promise.all(cartItems.map(item => axios.delete('http://localhost:3001/cartItems/${item.id}')));

      // Clear cart items in the frontend state
      setCartItems([]);

      alert("Purchase successful!");
    } catch (error) {
      console.error("Error processing purchase:", error);
      alert("An error occurred while processing your purchase. Please try again.");
    }
  };
  return (
    <div className="add-to-cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>No items in your cart.</p>
      ) : (
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <div key={item.id} className="cart-item">
              <img src={item.img} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Price: ${item.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button onClick={() => decrementQuantity(index)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementQuantity(index)}>+</button>
                </div>
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="cart-summary">
          <h3>Total Amount: ${totalAmount}</h3>
          <button className="buy-button" onClick={handlePurchase}>Buy Now</button>
        </div>
      )}
    </div>
  );
};

export default AddToCart;