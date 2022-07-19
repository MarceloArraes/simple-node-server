const http = require('http');

const PORT = 3000;

const server = http.createServer();

const scientists = [
  { name: 'Albert Einstein', field: 'Physics' },
  { name: 'Isaac Newton', field: 'Physics' },
  { name: 'Galileo Galilei', field: 'Physics' },
  { name: 'Johannes Kepler', field: 'Physics' },
];

server.on('request', (req, res) => {
  const items = req.url.split('/')
  console.log(items);
  if (req.method == 'POST' && items[1] === 'scientists') {
    req.on('data', (data) => {
      const scientist = JSON.parse(data);
      scientists.push(scientist);
      console.log("scientist", scientists);
    });
    req.pipe(res);
    //res.setHeader('Content-Type', 'application/json');
    //res.write(JSON.stringify(scientists));
  }
  else if (req.method=='GET' && items[1] === 'scientists' && items.length === 2) {
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(scientists));
  } else if(items.length === 3) {
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(scientists[items[2]]));
  }else {
    res.statusCode = 404;
    res.end('Not found');
  }
})


server.listen(PORT, () => {
  console.log('Server running at http://localhost:3000/');
});