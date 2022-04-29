const User = require("../models/userModel");
const { getPostData } = require("../utils");
// @desc    Gets Single Users
// @route   GET / api / users

async function getUsers(req, res) {
  try {
    const users = await User.findAll();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(users));
    res.end();
  } catch (error) {
    console.log(error);
    //     res.writeHead(400, { "Content-Type": "application/json" });
    //     res.write(JSON.stringify({ message: "route not found" }));
    //     res.end();
  }
}

// @desc    Gets Single User
// @route   GET / api / users /:id

async function getUserById(req, res, id) {
  try {
    const user = await User.findOneById(id);
    if (!user) {
      //
      res.writeHead(400, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "User not found" }));
      res.end();
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(user));
      res.end();
    }
  } catch (error) {
    console.log(error);
    //     res.writeHead(400, { "Content-Type": "application/json" });
    //     res.write(JSON.stringify({ message: "route not found" }));
    //     res.end();
  }
}

async function createUser(req, res) {
  try {
    //
    console.log("Hi1");
    const body = await getPostData(req);
    console.log("Hi2 - ", body);
    const { username, email, password } = JSON.parse(body);
    console.log("Hi3");
    const user = {
      username,
      email,
      password,
    };
    console.log("Hi4");
    const newUser = await User.create(user);
    console.log("Hi44");
    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(JSON.stringify(newUser));
  } catch (error) {
    //
  }
}

// Update user
// @route   PUT /api/users/:id

async function updateUser(req, res, id) {
  try {
    const user = await User.findOneById(id);
    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User Not Found" }));
    } else {
      const body = await getPostData(req);

      const { username, email, password } = JSON.parse(body);

      const userData = {
        username: username || user.username,
        email: email || user.email,
        password: password || user.password,
      };

      const updUser = await User.update(id, userData);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(updUser));
    }
  } catch (error) {
    console.log(error);
  }
}

// @desc    Delete user
// @route   DELETE / api / users /:id

async function removeUser(req, res, id) {
  try {
    const user = await User.findOneById(id);
    if (!user) {
      //
      res.writeHead(400, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "User not found" }));
      res.end();
    } else {
      await User.remove(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: `User ${id} has been removed` }));
      res.end();
    }
  } catch (error) {
    console.log(error);
    //     res.writeHead(400, { "Content-Type": "application/json" });
    //     res.write(JSON.stringify({ message: "route not found" }));
    //     res.end();
  }
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
};
