const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const stripe = require("stripe")(
  "sk_test_51LcoOqEevolcq6FMNW6SitMoRqMvi9Fc9s4sCizGNEb48TUv1GDFFmBzhFshJz4oM6RUkHvOtZ1iCGIR8y7x5qcD00NBXxTnCB"
);

// Process stripe payments   =>   /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "pkr",
    metadata: { integration_check: "accept_a_payment" },
  });
  console.log("Payment intent:", paymentIntent);

  res.status(200).json({
    success: true,
    client_secret: paymentIntent.client_secret,
  });
});

// Send stripe API Key   =>   /api/v1/stripeapi
exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey:
      "pk_test_51LcoOqEevolcq6FM3rRqNCTx6111DCf5Vsi4osYxPTEtFmsNMRqFASot97t3HkVIaTLRtsa0wtqPNdkeBOSrMuF000TmoqPNxx",
  });
});
