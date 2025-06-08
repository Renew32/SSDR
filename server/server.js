// Charge les variables d'env
require("dotenv").config({ path: "./.env" });

// Imports
const express = require("express");
const cors = require("cors");
const { resolve } = require("path");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

// Init
const app = express();

// Middlewares
app.use(cors());                       // Autorise les requêtes cross-origin
app.use(express.json());               // Parse les JSON
app.use(express.static(process.env.STATIC_DIR));  // Sert le front

// Routes
app.get("/", (req, res) => {
  const indexPath = resolve(process.env.STATIC_DIR, "index.html");
  res.sendFile(indexPath);
});

app.get("/config", (req, res) => {
  res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "CAD",
      amount: 1999,
      automatic_payment_methods: { enabled: true },
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    console.error("Stripe error:", e);
    res.status(400).send({ error: { message: e.message } });
  }
});

// Démarrage
const PORT = process.env.PORT || 5252;
app.listen(PORT, () => {
  console.log(`Node server listening at http://localhost:${PORT}`);
});