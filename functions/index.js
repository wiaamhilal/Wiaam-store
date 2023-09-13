const functions = require("firebase-functions");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const express = require("express");

const app = express();

app.use(cors({origin: true}));
app.use(express.json());

app.get("/", (req, res) => res.status(200).send("shlonak ya ghali"));
app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "aed",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
exports.api = functions.https.onRequest(app);
