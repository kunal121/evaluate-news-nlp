const express = require("express");
const mockAPIResponse = require("./mockAPI.js");
const app = express();
const AYLIENTextAPI = require("aylien_textapi");
require("dotenv").config();
const textapi = new AYLIENTextAPI({
  application_id: process.env.APPLICATION_ID,
  application_key: process.env.APPLICATION_KEY
});

app.use(express.static("dist"));

app.get("/", function(req, res) {
  res.sendFile("dist/index.html");
});

// designates what port the app will listen to for incoming requests
app.listen(8080, function() {
  console.log("Example app listening on port 8081!");
});

app.get("/text-analyze", function(req, res) {
  textapi.classify(
    {
      text: req.query.name
    },
    function(error, response) {
      try {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.send(response);
      } catch (error) {
        next(error);
      }
    }
  );
});

app.get("/test", function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.send(mockAPIResponse);
});
