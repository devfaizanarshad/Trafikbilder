const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const https = require("https");
const cors = require("cors");
const fs = require('fs');
const bodyParser = require("body-parser");
const categories = require("./routes/categoryRoutes");
const users = require("./routes/userRoutes");
const images = require("./routes/imageRoutes");
const subscriptions = require("./routes/subscriptionRoutes");
const videoRoutes = require("./routes/videoRoutes");
const paymentRequestsRoutes = require("./routes/paymentRequestsRoutes");

const MongoUrl = "mongodb+srv://amirrafay135:XyImBf1YGtzacNcK@blogcluster.drny97g.mongodb.net/Trafikbilder?retryWrites=true&w=majority";

const app = express();
const port = 4000;

// Database Connection
mongoose.connect(MongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on("error", () => {
  console.log("Error occurred in db connection");
});
db.once("open", () => {
  console.log("Connected");
});

// Enable CORS for all routes
app.use(cors());
// app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + "/public"));

// Parse incoming requests with urlencoded and json bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Run Route Files APIs
app.use("/category", categories);
app.use("/user", users);
app.use("/image", images);
app.use("/subscription", subscriptions);
app.use("/video", videoRoutes);
app.use("/paymentRequest", paymentRequestsRoutes);

// // ONLINE SERVER
// const server = https.createServer({
//   key: fs.readFileSync("/etc/letsencrypt/live/" + process.env.DOMAIN + "/privkey.pem", "utf8"),
//   cert: fs.readFileSync("/etc/letsencrypt/live/" + process.env.DOMAIN + "/cert.pem", "utf8"),
//   ca: fs.readFileSync("/etc/letsencrypt/live/" + process.env.DOMAIN + "/chain.pem", "utf8")
// }, app);

// server.listen(port, ()=> {
//   console.log(`Server Running here 👉 https:localhost:${port}`);
// });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
