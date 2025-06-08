const express = require("express");
const app = express();
const { resolve } = require("path");
const env = require("dotenv").config({ path: "./.env" });
const PORT = process.env.PORT || 5252;

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});


app.use(express.json()); // ← obligatoire !


app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY, // majuscule !
  });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "CAD",
      amount: 1999,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    console.error("Stripe error:", e); // Debug
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});


app.listen(PORT, () =>
  console.log(`Node server listening at http://localhost:${PORT}`)
);