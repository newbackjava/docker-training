const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;
const indexPath = path.join(__dirname, 'index.html');

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  if (fs.existsSync(indexPath)) {
    fs.createReadStream(indexPath).pipe(res);
  } else {
    res.end('<h1>Welcome from Node + Volume</h1>');
  }
});
server.listen(port, '0.0.0.0', () => console.log('listening on', port));

