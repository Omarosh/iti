const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/static", express.static("static"));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/index.html"));
});
app.post("/api/sign-up", (req, res) => {
  const { email, password, username = "" } = req.body;
  //File not exists
  if (!fs.existsSync("data.json")) {
    fs.writeFileSync("data.json", "{}");
  }

  const fileData = JSON.parse(fs.readFileSync("data.json").toString());
  //Check if email or password are not sent in the body
  if (email === undefined || password === undefined) {
    res
      .status(500)
      .send({ error: "Both email and password fields are required" });
    return;
  }
  const currentUser = fileData[email];
  if (currentUser) {
    res.status(400).send({ error: "Email already exists", success: false });
  } else {
    fileData[email] = {
      password,
      username,
    };
    try {
      fs.writeFileSync("data.json", JSON.stringify(fileData));
      res.status(200).send({ success: true, username });
    } catch (e) {
      console.log(e);
      res.status(500).send({ error: "Server Error" });
    }
  }
});
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  //File not exists
  if (!fs.existsSync("data.json")) {
    fs.writeFileSync("data.json", "{}");
  }
  const fileData = JSON.parse(fs.readFileSync("data.json").toString());
  //Check if email or password are not sent in the body
  if (email === undefined || password === undefined) {
    res
      .status(500)
      .send({ error: "Both email and password fields are required" });
    return;
  }
  const currentUser = fileData[email];

  if (currentUser) {
    if (currentUser.password === password) {
      res.status(200).send({ success: true, username: currentUser.username });
    } else {
      res.status(403).send({ error: "Wrong Password", success: false });
    }
  } else {
    res.status(403).send({ error: "Wrong Email", success: false });
  }
});
const port = 5002;
app.listen(port, () => {
  console.log(
    `Application Started at port: ${port} : http://localhost:${port}/ `
  );
});
