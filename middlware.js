const headers = (req, res) => {
  res.send = (data) => {
    res.writeHead(200, {
      "Content-type": "application/json"
    });
    res.end(JSON.stringify(data))
  }
}

const queries = (base) => (req, res) => {
  const parsedURL = new URL(req.url, base);
  const params = {};
  parsedURL.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  
  req.pathname = parsedURL.pathname;
  req.params = params;
}

export { headers, queries };