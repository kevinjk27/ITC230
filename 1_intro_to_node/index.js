var http = require("http"), fs = require('fs');

function serveStatic(res, path, contentType, responseCode){
  if(!responseCode) responseCode = 200;
  console.log(__dirname + path)
  fs.readFile(__dirname + path, function(err, data){
      if(err){
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
      }
      else{
        res.writeHead(responseCode, {'Content-Type': contentType});
        res.end(data);
      }
  });
}

http.createServer(function(req,res){
  console.log('createServer got request')
  var path = req.url.toLowerCase();
  switch(path) {
    case '/': 
      serveStatic(res, '/../public/home.html', 'text/html');
      const data = require("./data")
      data.getAll()
      break;
    case '/about':
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('My name is Kevin. I am currently pursuing AAS in Web Development track.');
      break;
    default:
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404:Page not found.');
  }
  
}).listen(process.env.PORT || 3000);
console.log('after createServer')


const data = require("./data")

console.log(data.getAll())