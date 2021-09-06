const express = require("express");
const router = express.Router();

//Import all the routes
const homeRouter = require("./routes/home.router");
const SalonRouter = require("./routes/salon.router");
const productRouter = require("./routes/product.router");
const reviewRouter = require("./routes/review.router");
const orderRouter = require("./routes/order.router");
const cartRouter = require("./routes/cart.router");
const userRouter = require("./routes/user.router");
const bookingRouter = require("./routes/booking.router");
const groomingServiceRouter = require("./routes/groomingService.router");



//Main route
router.get("/", function (req, res) {
    res.status(200).send({ status: "success", message: "API is working fine." });
});


//All Route Paths
router.use("/home", homeRouter);
router.use("/salon", SalonRouter);
router.use("/product", productRouter);
router.use("/review", reviewRouter);
router.use("/booking", bookingRouter);
router.use("/user", userRouter);
router.use("/order", orderRouter);
router.use("/cart", cartRouter);
router.use("/service", groomingServiceRouter);




module.exports = router;
