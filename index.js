const http = require("http");
// const fs = require("fs");

// fs.readFile(`./txt/input.txt`, "utf-8", (err, data) => {
//   console.log(data);
// });

const server = http.createServer((req, res) => {
  res.end("Hello from the server!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log(`Listening to requests on port 8000...`);
});
