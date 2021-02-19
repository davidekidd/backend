const path = require("path");
require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const chalk = require("chalk");
const cors = require("cors");

const DB_Setup = require('./app/config/db');

const app = express();
const http = require('http').Server(app);
app.use(cors());

// View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

const indexRouter = require('./app/routes/index');
const adminAuthRoutes = require("./app/routes/AdminAuth");
const cashGiftRoutes = require("./app/routes/CashGift");
const eventTitleRoutes = require("./app/routes/EventTitle");
const eventImagesRoutes = require("./app/routes/EventImages");
const interestRoutes = require("./app/routes/Interest");

app.use('/api', indexRouter);
app.use("/api/v1/admin-auth", adminAuthRoutes);
app.use("/api/v1/cash-gift", cashGiftRoutes);
app.use("/api/v1/event-title", eventTitleRoutes);
app.use("/api/v1/event-images", eventImagesRoutes);
app.use("/api/v1/interest", interestRoutes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers for development
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

http.listen(process.env.PORT, function () {
  console.log(chalk.green("✓"), "Application running on port: ", process.env.PORT);
});
