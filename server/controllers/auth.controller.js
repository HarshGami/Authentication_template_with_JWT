const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

exports.register = async (req, res) => {
  try {
    const user = await User.findOne({
      Email: req.body.Email,
    });

    if (user) {
      res.json({ status: "error", message: "email is used before" });
      return;
    }

    const hash = bcrypt.hashSync(req.body.Password, 12);

    await User.create({
      Name: req.body.Name,
      Email: req.body.Email,
      Password: hash,
    });

    const name = req.body.Name;
    const token = jwt.sign(
      {
        Email: req.body.Email,
      },
      process.env.SECRET_KEY
    );

    res.json({ status: "ok", name, token });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({
      Email: req.body.Email,
    });

    if (user) {
      if (bcrypt.compareSync(req.body.Password, user.Password)) {
        const name = user.Name;
        const token = jwt.sign(
          {
            Email: req.body.Email,
          },
          process.env.SECRET_KEY
        );

        res.json({ status: "ok", name, token });
      } else {
        res.json({ status: "error", message: "password is invalid" });
      }
    } else res.json({ status: "error", message: "user is not found" });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};

exports.verification = async (req, res) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token)
      return res
        .status(401)
        .json({ status: "error", message: "No token provided" });

    await jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err)
        return res
          .status(401)
          .json({ status: "error", message: "Invalid token" });

      res.json({ status: "ok", decoded });
    });
  } catch (error) {
    res.json({ status: "error", message: error });
  }
};
