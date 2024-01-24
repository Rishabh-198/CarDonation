import abi from "./contract/Donation.json";
import { useState, useEffect } from "react";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import pic1 from "./pic1.jpg";
import pic2 from "./pic2.jpg";
import pic3 from "./pic3.jpg";
import pic4 from "./pic4.jpg";
import pic5 from "./pic5.jpg";
import "./App.css";
const ethers = require("ethers")



function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0xC938DF54c2138ADc73fd841Dd4EA7eAe36Ce9823";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );
          setAccount(account);
          setState({ provider, signer, contract });
        } else {
          var metamaskLink = "https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?pli=1";
          alert("Please install Metamask. Create wallet and add some funds in Sepolia Network account. For testing you can add faucet tokens. Allow popup if blocked.");
          
          // Check if the window is already open
          if (!window.metamaskWindow || window.metamaskWindow.closed) {
              window.metamaskWindow = window.open(metamaskLink, '_blank');
          } else {
              window.metamaskWindow.focus(); // If the window is already open, focus on it
          }
      }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);
  const [currentImage, setCurrentImage] = useState(0);

  const imageArray = [pic1, pic2, pic3, pic4, pic5];

  const handleButtonClick = () => {
    // Incrementing the current image index and resetting to 0 if it exceeds the array length
    setCurrentImage((prevIndex) => (prevIndex + 1) % imageArray.length);
  };
  // console.log(state);
  
  
  return (
    <div style={{ backgroundColor: "#F7F7F7", height: "100%", textAlign: "center" }}>

      {/* Text message */}
      <p style={{ fontSize: "90%",   fontWeight: "bold", color: "#333", margin: "" }}>
      Hello, this is Rishabh Shukla. 
      During our(me and my friends) trip to Manali on December 29, 2023, the car we rented got damaged. After celebrating New Year in Kasol, my car accidentally hit a rock, causing an oil leak. We spent the night in the car, towed it for repairs the next day, and paid 6100 Rs for fixing it. Now, the owner refuses to return our 10,000 Rs security deposit and demands more money, although the car is working fine. As a student, I am financially strained and seeking help to cover these unexpected costs. Any donations would be appreciated. Thank you!      </p>

      {/* Image container with fixed height */}
      <div style={{ backgroundColor: "", height: "400px", overflow: "hidden", marginBottom: "20px", position: "relative" }}>
        <img
          src={imageArray[currentImage]}
          className="img-fluid"
          alt="dcdsc"
          style={{ width: "23%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
        />

        {/* Button with hover effect */}
        <button
          onClick={handleButtonClick}
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "#007BFF",
            color: "#FFFFFF",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease-in-out",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#007BFF"}
        >
          See more painful images
        </button>
      </div>

      {/* Content below the images and button */}
      <div>
        <p class="text-muted lead" style={{ marginTop: "20px", marginLeft: "5px", color: "#555", fontSize:"120%" }}>
          <small>Your connected account - {account}</small>
        </p>

        <div className="container">
          <Buy state={state} />
          <Memos state={state} />
        </div>
      </div>
    </div>
  );
}

export default App;