const http = require('http');
const fs = require('fs');
const header = {'Content-Type': 'text/html'};
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var cors = require('cors');

app.use(express.static(__dirname + '/public'));
app.use(cors());

var crediti = JSON.parse(fs.readFileSync('crediti.json', 'utf-8'));

const send = (source, destination, status = 200, headers = header) => {
  destination.writeHead(status, headers);
  fs.createReadStream(source).pipe(destination);
};

const server = http.createServer((req, res) => {

  const url = req.url;

  if (url === '/') {
    return send('index.html', res);
  } else {
    send('error.html', res, 404, {});
  }

});

const callback = () => {
  const address = server.address().address;
  const port = server.address().port;
  console.log(`Il server è stato avviato all'indirizzo http://${address}:${port}`);
  console.log(`Il server è di: ${crediti.author}`);
}

server
  .listen(
    8000, 
    '127.0.0.1',
    callback
  )