const http = require("http");
// const fs = require("fs");

// fs.readFile(`./txt/input.txt`, "utf-8", (err, data) => {
//   console.log(data);
// });

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/product") {
    res.end("Welcome to the product");
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end(`<h1> Page not found! </h1>`);
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log(`Listening to requests on port 8000...`);
});
