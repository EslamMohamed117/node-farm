const http = require("http");
const fs = require("fs");

// fs.readFile(`./txt/input.txt`, "utf-8", (err, data) => {
//   console.log(data);
// });

const server = http.createServer((req, res) => {
  //Loading the data synchronously
  const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
  const dataObj = JSON.parse(data);

  //Reading the request path
  const pathName = req.url;
  if (pathName === "/product") {
    res.end("Welcome to the product");
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end(`<h1> Page not found! </h1>`);
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log(`Listening to requests on port 8000...`);
});
