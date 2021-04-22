const midtransClient = require("midtrans-client");
// const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
let port = process.env.PORT || 5001;
const app = express();
//Middlewares
app.use(express.urlencoded({ extended: true })); // to support URL-encoded POST body
app.use(express.json()); // to support parsing JSON POST body
app.use(cors({ origin: true }));
//Listen Express
app.listen(port, () => {
  console.log(port);
});

//API

//App Config

//API Routes
app.get("/", (request, response) => response.status(200).send("Hello World"));
app.post("/checkout", function (req, res) {
  // initialize snap client object
  console.log(req.body.harga);
  let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.ENV_SK,
  });
  // create snap transaction token
  let parameter = {
    transaction_details: {
      order_id: req.body.orderID,
      gross_amount: req.body.harga,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: "budi",
      last_name: "pratama",
      email: "budi.pra@example.com",
      phone: "08111222333",
    },
    callback: {
      finish : "http://localhost:3000/"
    }
  };

  snap.createTransaction(parameter).then((transaction) => {
    // transaction token
    let transactionToken = transaction.token;
    console.log("transactionToken:", transactionToken);
    res.send({ token: transactionToken });
  });
});
