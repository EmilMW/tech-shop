const jwt = require("jsonwebtoken");
const config = require("config");
const { Users } = require("../models/users");
const jwtConfig = config.get("jwt");
const maxAge = 3 * 24 * 60 * 60;

function createToken(user) {
  const userDataToSign = { ...user };
  delete userDataToSign.password;
  return jwt.sign({ ...user }, jwtConfig.secret, {
    expiresIn: maxAge,
  });
}

async function tryLogin(username, password) {
  const user = await Users.findOne({ username, password });

  if (!user) {
    return new Error("Auth error");
  }

  return user;
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await tryLogin(username, password);
    if (user instanceof Error) {
      res.status(401).json({
        message: "Invalid username or password",
      });
    } else {
      const token = createToken(user);
      const tokenAge = user.role === "admin" ? 99999999999999999999999999 : maxAge * 1000;
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: tokenAge,
      });
      res.status(201).json({
        userId: user.id,
        username: user.username,
        type: user.type,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function refresh(req, res) {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, jwtConfig.secret, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.send("Token invalid");
      } else {
        res.status(201).json({
          userId: decodedToken._doc._id,
          username: decodedToken._doc.username,
          type: decodedToken._doc.type,
        });
      }
    });
    return;
  }
  res.send({ status: "no token" });
}

async function logout(req, res) {
  res.cookie("jwt", "", {
    maxAge: 1,
  });
  res.status(200).json({
    logged_out: true,
  });
}

async function signup(req, res) {
  const { username, password, userType, address, phone } = req.body;
  try {
    const user = {
      username,
      password,
      type: userType,
      address: address,
      phone: phone,
    };
    console.log("user", user);
    const userExist = await Users.findOne({ username });
    if (userExist) {
      throw new Error("User already exist");
    }

    const newUser = await Users.create(user);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: 500,
    });
  }
}

module.exports = {
  login,
  logout,
  signup,
  refresh,
};
