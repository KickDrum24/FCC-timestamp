// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

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

function getDate (inputDate) {
  
  var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var dow = inputDate.getUTCDay();

  var dgt = inputDate.getUTCDate();
  if (dgt < 10) { dgt = '0' + dgt }

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
    + dgt + " "
    + tlm[moy] + " "
    + inputDate.getUTCFullYear() + " "
    + hour + ":"
    + min + ":"
    + sec + " GMT";

    return date;
}
//respond with current time
app.get('/api/', (req, res) => {
  res.json({ unix: Date.now(), utc: getDate(new Date()) })
});
//respond with requested time
app.get('/api/:zulu', (req, res) => {
  if (/^\d+$/.test(req.params.zulu)) {
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
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


