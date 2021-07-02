// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var PORT = 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
// app.get("/api/hello", function (req, res) {
//   res.json({greeting: 'hello API'});
// });

//Fri, 25 Dec 2015 00:00:00 GMT
function getDate (inputDate) {
  // var inputDate = new Date(input);
  var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var dow = inputDate.getUTCDay();

  var tlm = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var moy = inputDate.getUTCMonth();

  var hour = inputDate.getUTCHours();
  if (hour < 10) { hour = '0' + hour }

  var min = inputDate.getUTCMinutes();
  if (min < 10) { min = '0' + min }

  var sec = inputDate.getUTCSeconds();
  if (sec < 10) { sec = '0' + sec }

  var date =
    week[dow] + ", "
    + inputDate.getUTCDate() + " "
    + tlm[moy] + " "
    + inputDate.getUTCFullYear() + " "
    + hour + ":"
    + min + ":"
    + sec + " GMT";

    return date;
}




app.get('/api/', (req, res) => {
  // var currentdate = new Date();

  // var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  // var dow = currentdate.getUTCDay();

  // var tlm = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // var moy = currentdate.getUTCMonth();

  // var hour = currentdate.getUTCHours();
  // if (hour < 10) { hour = '0' + hour }

  // var min = currentdate.getUTCMinutes();
  // if (min < 10) { min = '0' + min }

  // var sec = currentdate.getUTCSeconds();
  // if (sec < 10) { sec = '0' + sec }

  // var date =
  //   week[dow] + ", "
  //   + currentdate.getUTCDate() + " "
  //   + tlm[moy] + " "
  //   + currentdate.getUTCFullYear() + " "
  //   + hour + ":"
  //   + min + ":"
  //   + sec + " GMT";

  res.json({ unix: Date.now(), utc: getDate(new Date()) })
});

app.get('/api/:zulu', (req, res) => {
  if (/^\d+$/.test(req.params.zulu)) {
    // console.log(typeof(req.params.zulu))
    var uTime = parseFloat(req.params.zulu)
    res.json({ unix: uTime, utc: getDate(new Date(uTime)) })
  }else{
  var ztime = new Date(req.params.zulu)
  isNaN(ztime.getTime()) ?
    res.json({ error: 'Invalid Date' }) :
    res.json({ unix: ztime.getTime(), utc: getDate(ztime)})
  }
});
// listen for requests :)
// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });
app.listen(PORT, function (err) {
  err ? console.log("Error in server setup") :
    console.log("Server listening on Port", PORT);
})



// Date.prototype.getTime()
// Returns the numeric value of the specified date 
// as the number of milliseconds since January 1, 1970, 00:00:00 UTC.
//  (Negative values are returned for prior times.)