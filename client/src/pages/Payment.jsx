import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./../styles/payment.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [country, setCountry] = useState("Canada");
  const [postalCode, setPostalCode] = useState("");
  const navigate = useNavigate();

  // formate le numéro de carte en groupes de 4
  const handleCardNumberChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 16);
    const parts = digits.match(/.{1,4}/g) || [];
    setCardNumber(parts.join(" "));
  };

  // formate la date d’expiration en MM/YY
  const handleExpiryChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) {
      setExpiry(digits.slice(0, 2) + "/" + digits.slice(2));
    } else {
      setExpiry(digits);
    }
  };

  // limite le CVC à 3 chiffres
  const handleCvcChange = (e) => {
    const digits = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCvc(digits);
  };

  const handlePayNow = (e) => {
    e.preventDefault();
    if (
      cardNumber.replace(/\s/g, "").length !== 16 ||
      expiry.length !== 5 ||
      cvc.length !== 3 ||
      !country ||
      !postalCode
    ) {
      alert("Please fill all fields correctly!");
      return;
    }
    navigate("/completion");
  };

  return (
    <main className="d-flex justify-content-center align-items-center py-5">
      <form className="payment-form" onSubmit={handlePayNow}>
        <h3 className="mb-4">CanadianCourrier</h3>

        {/* Card Number */}
        <div className="mb-3">
          <label htmlFor="cardNumber" className="form-label">
            Card number
          </label>
          <input
            type="text"
            className="form-control"
            id="cardNumber"
            placeholder="1234 1234 1234 1234"
            value={cardNumber}
            onChange={handleCardNumberChange}
          />
        </div>

        {/* Expiry & CVC */}
        <div className="row mb-3">
          <div className="col">
            <label htmlFor="expiry" className="form-label">
              Expiration date
            </label>
            <input
              type="text"
              className="form-control"
              id="expiry"
              placeholder="MM/YY"
              value={expiry}
              onChange={handleExpiryChange}
            />
          </div>
          <div className="col">
            <label htmlFor="cvc" className="form-label">
              Security code
            </label>
            <input
              type="text"
              className="form-control"
              id="cvc"
              placeholder="CVC"
              value={cvc}
              onChange={handleCvcChange}
            />
          </div>
        </div>

        {/* Country */}
        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <select
            className="form-select"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option>Canada</option>
            <option>United States</option>
            <option>France</option>
            <option>United Kingdom</option>
            <option>Germany</option>
            <option>Australia</option>
            <option>Laos</option>
            <option>Andore</option>
            <option>North Macedonia</option>
            <option>Saint Martin</option>
          </select>
        </div>

        {/* Postal code */}
        <div className="mb-4">
          <label htmlFor="postalCode" className="form-label">
            Postal code
          </label>
          <input
            type="text"
            className="form-control"
            id="postalCode"
            placeholder="M5T 1T4"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Pay now
        </button>
      </form>
    </main>
  );
}