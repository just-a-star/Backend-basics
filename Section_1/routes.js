const fs = require("fs");
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head<title>EEnter message</title></head>");
    res.write("<body><form action='/message' method='POST'><input type='text' name='message'> <button type='submit'>Send</button></form></body>");
    res.write("</html>");
    return res.end(); // we use return so that it would stop here and would not continue to the next res.write or lines of code
  }

  if (url === "/message" && method === "POST") {
    // fs.writeHead(302, { Location: "/" });
    const body = []; // we are not changing the value but with push we are changing the array
    req.on("data", (chunk) => {
      // in req.on  ("data") it listen to a chunk of data
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString(); // this line of code is to convert the buffer to string, buffer is like loading the data, The concat() method joins all buffer objects in an array into one buffer object.
      //   console.log(parsedBody);
      const message = parsedBody.split("=")[1]; // this line of code is to split the key and the value of the input, [1] is the second element of the array message=test
      // res.writeFileSync("message.txt", message); //  sync will block the code until it is done, could be a problem if the file is big
      fs.writeFile("file.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      }); //
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head<title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!</h1></body>");
  res.write("</html>");
};

// module.exports = {
//   handler: requestHandler,
//   someText: "Some hard coded text",
// }; 

exports.handler = requestHandler;
exports.someText = "Some hard coded text";