import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";

function Payment(props) {
  const stripePromise = loadStripe(publishableKey);
  //const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/config`).then(async (r) => {
      const data = await r.json();
      console.log("CONFIG RESPONSE:", data); // Debug

      const { publishableKey } = data;
      if (publishableKey) {
        setStripePromise(loadStripe(publishableKey));
      } else {
        console.error("publishableKey is missing!");
      }
    });
  },);

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then(async (r) => {
        const data = await r.json();
        console.log("PAYMENT INTENT RESPONSE:", data); // Debug

        const { clientSecret } = data;
        if (clientSecret) {
          setClientSecret(clientSecret);
        } else {
          console.error("clientSecret is missing!");
        }
      })
      .catch((error) => {
        console.error("Error in /create-payment-intent:", error);
      });
  }, []);



  return (
    <>
      <h3>CanadianCourrier</h3>
      {stripePromise && clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      ) : (
        <p>Chargement du paiement...</p>
      )}
    </>
  );
}

export default Payment;