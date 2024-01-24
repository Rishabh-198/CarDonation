import React, { useState } from "react";
import { ethers } from "ethers";

const Buy = ({ state }) => {
  const [amount, setAmount] = useState(""); // New state for amount

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const receive_donation = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const name = document.querySelector("#name").value;
    const message = document.querySelector("#message").value;
  
    if (!amount || isNaN(amount) || amount <= 0) {
      console.error("Invalid amount");
      alert("Invalid amount. Please enter a valid amount greater than 0.");
      return;
    }
  
    const transaction = await contract.receive_donation(name, message, {
      value: ethers.utils.parseEther(amount),
    });
    await transaction.wait();
    console.log("Transaction is done");
  };
  

  return (
    <>
      <div className="container-md" style={{  width: "50%", margin: "auto" }}>
  <p style={{ fontSize: "100%", fontWeight: "bold", color: "#333" }}>
    Input details
  </p>
  <form onSubmit={receive_donation}>
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        id="name"
        placeholder="Enter Your Name"
        style={{ width: "40%", alignContent:"center", marginTop:"2%" }} // Adjust the width as needed
      />
    </div>
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        id="message"
        placeholder="Enter Your Message"
        style={{ width: "40%", alignContent:"center", marginTop:"2%" }} // Adjust the width as needed
      />
    </div>
    <div className="mb-3">
      <input
        type="text"
        className="form-control"
        value={amount}
        onChange={handleAmountChange}
        placeholder="Enter Amount To Donate(only Sepolia)"
        style={{ width: "40%", alignContent:"center", marginTop:"2%" }} // Adjust the width as needed
      />
    </div>
    <button
  type="submit"
  className="btn btn-primary"
  style={{ 
    marginTop: "10px", 
    marginLeft:"-34%", 
    backgroundColor:"#96D4D4",
    fontSize: "16px" // Adjust the font size as needed
  }}
  disabled={!state.contract}
  onMouseOver={() => {
    if (!state.contract) {
      alert("Please install Metamask. Create an account and add some funds in that account. For testing you can add faucet tokens.");
    }
  }}
>
  Pay
</button>
  </form>
</div>

    </>
  );
};

export default Buy;
