// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.get("/api/timestamp/:date_string", (req, res) =>{
  let date;
  let date_string = req.params.date_string;
  if(date_string.match(/^\d+$/)){
    date = new Date(Number.parseInt(date_string))}
  else if(date_string.match(/^\d\d\d\d-\d\d-\d\d$/)){
    try { date = new Date(date_string)}
    catch(err){
      date = null;
    }
  }
  if (date){res.json({"unix": date.getTime(), "utc" : date.toUTCString() })}
  else {res.json({"err" : "Invalid Date" })}
  
})
app.get("/api/timestamp/", (req, res) =>{
    let date = new Date();
  res.json({"unix": date.getTime(), "utc" : date.toUTCString() })
  
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
