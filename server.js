const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const bodyParser = require("body-parser");
const cors = require("cors");
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

app.use(express.static(__dirname + "/public"));

// Parse incoming requests with urlencoded and json bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Enable CORS for specific origin ('https://trafikbilder.se')
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
const corsOptions = {
  origin:'https://trafikbilder.se',
  credentials: true,

};

app.use(cors(corsOptions));

// Set middleware of CORS 
// app.use((req, res, next) => {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://trafikbilder.se"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   res.setHeader("Access-Control-Allow-Private-Network", true);
//   //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
//   res.setHeader("Access-Control-Max-Age", 7200);

//   next();
// });

// Set preflight
// app.options("*", (req, res) => {
//   console.log("preflight");
//   if (
//     req.headers.origin === "https://trafikbilder.se" &&
//     allowMethods.includes(req.headers["access-control-request-method"]) &&
//     allowHeaders.includes(req.headers["access-control-request-headers"])
//   ) {
//     console.log("pass");
//     return res.status(204).send();
//   } else {
//     console.log("fail");
//   }
// });

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// Run Route Files APIs
app.use("/category", categories);
app.use("/user", users);
app.use("/image", images);
app.use("/subscription", subscriptions);
app.use("/video", videoRoutes);
app.use("/paymentRequest", paymentRequestsRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
