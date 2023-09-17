const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<h1>Hello there!</h1>");
    res.write("<form action='/create-user' method='POST'><input name='username'> <button type='submit'>Send</button></form></body>");
    res.write("</html>");
  }

  if (url === "/user") {
    res.write("<html>");
    res.write("<h1>List of user</h1>");
    res.write("<ul><li>User 1</li></ul>");
    res.write("</html>");
  }

  if (url === "/create-user" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      res.writeHead(301, { Location: "/user" });
      console.log(message);
      return res.end();
    });
  }
};

module.exports.handler = requestHandler;
