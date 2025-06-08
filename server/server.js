// Charge les variables d'environnement
require("dotenv").config({ path: "./.env" });

const express = require("express");
const cors = require("cors");
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

const app = express();

// Middlewares
app.use(cors());                // Autorise toutes les origines
app.use(express.json());        // Parse les corps JSON

// Sert le build React statique
const staticPath = path.join(__dirname, "client", "build");
app.use(express.static(staticPath));

// Routes API
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

// Pour toutes les autres routes, renvoie index.html (React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(staticPath, "index.html"));
});

// Démarrage du serveur
const PORT = process.env.PORT || 5252;
app.listen(PORT, () => {
  console.log(`Node server listening at http://localhost:${PORT}`);
});