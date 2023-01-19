require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDB = require("./config/dbConn");

// const userRouter = require("./routes/usersRoutes");

const app = express();

// database connection
connectToDB();

// routers for routing APIs

const authRouter = require("./routes/authRoutes");
const regisRouter = require("./routes/regis");
const userRouter = require("./routes/userRoutes");

// Configuration Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// API Routes

app.use("/api", authRouter);
app.use("/api/user", regisRouter);
app.use("/api", userRouter);

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
