const http = require("http");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
} = require("./controllers/userController");

const server = http.createServer((req, res) => {
  //
  console.log(req.url);
  if (req.url === "/api/users" && req.method === "GET") {
    getUsers(req, res);
  } else if (req.url === "/api/users" && req.method === "POST") {
    createUser(req, res);
  } else if (
    req.url.match(/\/api\/users\/([0-9]+)/) &&
    req.method === "GET"
  ) {
    //
    const id = req.url.split("/")[3];
    getUserById(req, res, id);
  } else if (
    req.url.match(/\/api\/users\/([0-9]+)/) &&
    req.method === "PUT"
  ) {
    const id = req.url.split("/")[3];
    updateUser(req, res, id);
    //
  }else if (
    req.url.match(/\/api\/users\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    removeUser(req, res, id);
    //
  } else {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "route not found" }));
    res.end();
  }

  //   res.statusCode = 200;
  //   res.setHeader("Content-Type", "text/html");
  //   res.write("<h1>Hellooo </h1>");
  //   res.end();
  //   console.log("Request caught");
});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`server running on port ${PORT}`));
