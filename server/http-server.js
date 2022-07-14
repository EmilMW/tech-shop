const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routers/authRouter");
const productsRoutes = require("./routers/productsRouter");
const cartsRoutes = require("./routers/cartsRouter");
// const flightRoutes = require('./routers/flights-router');
// const userRoutes = require('./routers/users-router');
// const ticketsRoutes = require('./routers/tickets-router');
// const countriesRoutes = require('./routers/countries-router');

const mongo = config.get("mongo");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/products", productsRoutes);
app.use("/carts", cartsRoutes);

// app.use("*", authRoutes);
// app.use("/customers", customerRoutes);
// app.use("/users", userRoutes);
// app.use("/tickets", ticketsRoutes);

(async function () {
  mongoose.connect(mongo.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
})().catch((err) => console.log(err));

module.exports = app;
