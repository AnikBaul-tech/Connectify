// import model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function registerUser(req, res) {
  const { userName, email, password, age, contactNumber } = req.body;

  const isUserAlreadyRegistered = await userModel.findOne({
    email,
  });

  if (isUserAlreadyRegistered) {
    return res.status(400).json({
      message: "Already Registered",
    });
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    userName,
    password: hashPassword,
    email,
    age,
    contactNumber,
  });

  await user.save(); 

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );
  res.cookie("token", token);

  res.status(201).json({
    message: "User registered succesfully",
    user: {
      _id: user._id,
      email: user.email,
      userName: user.userName,
    },
  });
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email,
  });

  if (!user) {
    res.status(400).json({
      message: "Invalid email or Password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);


  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or Password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User Logged in succesfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.userName,
    },
  });
}
function logoutUser(req, res) {
  res.clearCookie("token");
  res.status(200).json({
    message: "Logged Out",
  });
}


module.exports = {
  registerUser,
  loginUser,
  logoutUser
};
