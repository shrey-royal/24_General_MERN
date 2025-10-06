const asyncHandler = require("express-async-handler");
const { APIContracts, APIControllers } = require("authorizenet");
const Order = require("../models/Order");
const Product = require("../models/Product");

const chargeCreditCard = async ({ amount, cardNumber, expiration, cardCode }) => {
  return new Promise((resolve, reject) => {
    const merchantAuth = new APIContracts.MerchantAuthenticationType();
    merchantAuth.setName(process.env.AUTH_NET_API_LOGIN_ID);
    merchantAuth.setTransactionKey(process.env.AUTH_NET_TRANSACTION_KEY);

    const creditCard = new APIContracts.CreditCardType();
    creditCard.setCardNumber(cardNumber);
    creditCard.setExpirationDate(expiration); // "YYYY-MM"
    creditCard.setCardCode(cardCode);

    const paymentType = new APIContracts.PaymentType();
    paymentType.setCreditCard(creditCard);

    const transactionRequest = new APIContracts.TransactionRequestType();
    transactionRequest.setTransactionType(
      APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION
    );
    transactionRequest.setPayment(paymentType);
    transactionRequest.setAmount(amount);

    const createRequest = new APIContracts.CreateTransactionRequest();
    createRequest.setMerchantAuthentication(merchantAuth);
    createRequest.setTransactionRequest(transactionRequest);

    const ctrl = new APIControllers.CreateTransactionController(createRequest.getJSON());

    // ✅ Use the correct environment URLs
    const env =
      process.env.AUTH_NET_ENV === "production"
        ? "https://api2.authorize.net/xml/v1/request.api"
        : "https://apitest.authorize.net/xml/v1/request.api";

    ctrl.setEnvironment(env);

    ctrl.execute(() => {
      const response = ctrl.getResponse();
      const apiResponse = new APIContracts.CreateTransactionResponse(response);

      if (!apiResponse) return reject(new Error("No response from Authorize.Net"));

      const resultCode = apiResponse.getMessages().getResultCode();
      const trxResponse = apiResponse.getTransactionResponse();

      if (resultCode === APIContracts.MessageTypeEnum.OK && trxResponse?.getMessages()) {
        return resolve({
          success: true,
          transactionId: trxResponse.getTransId(),
          authCode: trxResponse.getAuthCode(),
        });
      } else {
        const errText =
          trxResponse?.getErrors()?.getError()[0]?.getErrorText() ||
          apiResponse.getMessages().getMessage()[0].getText();
        return reject(new Error(errText || "Payment failed"));
      }
    });
  });
};


const checkout = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, cardInfo } = req.body;

  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  let itemsPrice = 0;

  // 🔹 Validate stock and calculate total
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product) {
      res.status(404);
      throw new Error(`Product not found: ${item.product}`);
    }
    if (item.qty > product.countInStock) {
      res.status(400);
      throw new Error(`Not enough stock for ${product.name}`);
    }

    itemsPrice += product.price * item.qty;
  }

  const shippingPrice = itemsPrice > 2000 ? 0 : 99;
  const taxPrice = +(itemsPrice * 0.1).toFixed(2);
  const totalPrice = +(itemsPrice + shippingPrice + taxPrice).toFixed(2);

  let transactionId = null;
  let isPaid = false;
  let paidAt = null;

  // 🔹 If payment is by credit card → charge it via Authorize.Net
  if (paymentMethod === "card") {
    try {
      const payment = await chargeCreditCard({
        amount: totalPrice,
        cardNumber: cardInfo.cardNumber,
        expiration: cardInfo.expiration, // e.g. "2027-12"
        cardCode: cardInfo.cardCode,
      });

      transactionId = payment.transactionId;
      isPaid = true;
      paidAt = Date.now();
    } catch (err) {
      console.error("❌ Payment Error (full):", err);
      res.status(400);
      throw new Error(`Payment failed: ${err.message}`);
    }
  }

  // 🔹 Create order in MongoDB
  const order = new Order({
    user: req.user.id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    isPaid,
    paidAt,
    transactionId,
  });

  const createdOrder = await order.save();

  // 🔹 Decrease stock
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    product.countInStock -= item.qty;
    await product.save();
  }

  res.status(201).json(createdOrder);
});

module.exports = { checkout };
