import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

const API_URL = "https://ssdr-2.onrender.com";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
    });

    if (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe} className="btn btn-primary mt-3">
        Pay
      </button>
    </form>
  );
};

export default function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {

    //fetch(`${import.meta.env.VITE_API_URL}/config`)
    fetch(`${API_URL}/config`)
      .then(async (r) => {
        const data = await r.json();
        console.log("CONFIG RESPONSE:", data);

        const { publishableKey } = data;
        if (publishableKey) {
          setStripePromise(loadStripe(publishableKey));
        } else {
          console.error("publishableKey is missing!");
        }
      })
      .catch((err) => {
        console.error("Error fetching config:", err);
      });

    fetch(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (r) => {
        const data = await r.json();
        console.log("PAYMENT INTENT RESPONSE:", data);

        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          console.error("clientSecret is missing!");
        }
      })
      .catch((err) => {
        console.error("Error creating payment intent:", err);
      });
  }, []);

  return (
    <main className="container py-5">
      <h2 className="mb-4">CanadianCourrier</h2>
      {stripePromise && clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      ) : (
        <p>Chargement du paiement...</p>
      )}
    </main>
  );
}