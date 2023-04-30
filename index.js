const http = require("http");
const fs = require("fs");
const url = require("url");

// fs.readFile(`./txt/input.txt`, "utf-8", (err, data) => {
//   console.log(data);
// });

const server = http.createServer((req, res) => {
  //Loading the data synchronously
  const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
  const dataObj = JSON.parse(data);

  // Loading template html files and replace the data

  const tempOverview = fs.readFileSync(
    `${__dirname}/templates/template-overview.html`,
    "utf-8"
  );
  const tempCard = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    "utf-8"
  );
  const tempProdcut = fs.readFileSync(
    `${__dirname}/templates/template-product.html`,
    "utf-8"
  );

  // function that replace data within the template
  const replaceTemplate = (template, product) => {
    let finalTemplate = template.replace(
      /{%PRODUCTNAME%}/g,
      product.productName
    );
    finalTemplate = finalTemplate.replace(/{%IMAGE%}/g, product.image);
    finalTemplate = finalTemplate.replace(/{%PRICE%}/g, product.price);
    finalTemplate = finalTemplate.replace(
      /{%DESCRIPTION%}/g,
      product.description
    );
    finalTemplate = finalTemplate.replace(/{%QUANTITY%}/g, product.quantity);
    finalTemplate = finalTemplate.replace(/{%ID%}/g, product.id);
    finalTemplate = finalTemplate.replace(/{%FROM%}/g, product.from);
    finalTemplate = finalTemplate.replace(/{%NUTRIENTS%}/g, product.nutrients);
    if (!product.organic)
      finalTemplate = finalTemplate.replace(/{%NOT_ORGANIC%}/g, "not-organic");

    return finalTemplate;
  };

  //Reading the request path
  const { query, pathname: pathName } = url.parse(req.url, true);

  // Overview response
  if (pathName === "/overview" || pathName === "/") {
    const htmlCards = dataObj
      .map((product) => replaceTemplate(tempCard, product))
      .join("");
    const htmlOverview = tempOverview.replace(`{%PRODUCT_CARDS%}`, htmlCards);

    res.writeHead(200, { "Content-type": "text/html" });
    res.end(htmlOverview);

    // Prdocut response
  } else if (pathName === "/product") {
    const product = dataObj[query.id];
    const productTemplate = replaceTemplate(tempProdcut, product);

    res.writeHead(200, { "Content-type": "text/html" });
    res.end(productTemplate);

    // API response
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // Page not found
  } else {
    res.writeHead(404, { "Content-type": "text/html" });
    res.end(`<h1> Page not found! </h1>`);
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log(`Listening to requests on port 8000...`);
});
