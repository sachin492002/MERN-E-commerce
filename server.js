//initialize express, mongoose and body-parser
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port =  process.env.PORT || 80;

const adminRoutes = require("./routes/adminRoutes")
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const feedsRoutes = require("./routes/feedsRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const swaggerDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs');
const { MongoClient, ServerApiVersion } = require('mongodb');


const clientUrl = process.env.CLIENT_URL
// const serverUrl = process.env.SERVER_URL
app.use(cors({ origin: clientUrl }))
const swaggerjsdoc =   YAML.load('./swagger.yaml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerjsdoc))

mongoose.connect("mongodb+srv://sachinm20:cp300464@cluster0.nkes8uj.mongodb.net/ShopDb?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//cloud mongodb
// mongoose.connect('mongodb+srv://himanshuhk:uV9qtrWrNYdcu0wW@shopdb.vcwnuof.mongodb.net/shopdb?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", () => {
  console.log("Connected to database mongodb database");
});

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "frontend", "build")));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, "frontend", "build", "index.html"))
    });
    console.log("Running production");
} else {
    app.get('/', (req, res) => {
        res.send("Server is working 😇")
    });
}
// Add Morgan logs
app.use(morgan("combined", { stream: accessLogStream }));

//adding multer middleware
// Set up Multer middleware

// Serve uploaded files
app.use("/images", (req, res, next) => {
  console.log(req.path);

  next();
}, express.static("images"));


app.get("/image", (req, res) => {
  res.sendFile(__dirname + `/images${req.path}`);
});
//added multer middleware
mongoose.connection.on("error", (err) => {
  if (err) {
    console.log("Error in database connection: " + err);
  }
});



//body - parser
app.use(bodyParser.json());

//static files
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "../shared/uploads")));

app.use('/api',adminRoutes);
app.use('/api',userRoutes);
app.use('/api',productRoutes);
app.use('/api',feedsRoutes);
app.use('/api',ordersRoutes);

app.listen(port, () => {
  console.log("Server started at port: " + port);
});
