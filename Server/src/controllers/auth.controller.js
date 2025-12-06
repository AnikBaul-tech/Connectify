// import model
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const { sendMail } = require('../services/mailer.services');

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
  try {
    if (
      typeof user.email === "string" &&
      user.email.toLowerCase().endsWith("@gmail.com")
    ) {
      sendMail({
        to: user.email,
        subject: "Welcome to Connectify.com!",
        text: `Hello ${user.userName}, welcome! Hi there,

Congratulations on joining Connectify — a place where people share their stories and connect with others every day.

You're now part of a growing community, and we’re excited to have you here!

Start your journey by posting your first "Day One" post. Tell the world about yourself and let others get to know you. Whether it’s your social life, work life, or everyday thoughts — Connectify is your space to express.

What you can do next:
• Connect with people with similar interests  
• Explore posts from the community  
• Share your own journey  

We can’t wait to see your first post. Welcome to Connectify!

— The Connectify Team`,
        html: `<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2>🎉 Welcome to Connectify!</h2>

    <p>Hi there,${user.userName}</p>

    <p>
      Congratulations on joining <strong>Connectify</strong> — a space where people share their stories,
      experiences, and moments every day.
    </p>

    <p>
      You're now part of a growing community of creators, professionals, explorers, and friends.
      We’re excited to have you here!
    </p>

    <h3>🚀 Start Your Journey</h3>

    <p>
      Why not begin your Connectify experience by creating your
      <strong>first day starting post</strong>?  
      Share a little bit about yourself and let the world know who you are.
    </p>

    <p>
      Whether it’s your <strong>social life</strong>, your <strong>daily thoughts</strong>, or your
      <strong>work life updates</strong>, Connectify is the perfect place to express and connect.
    </p>

    <h3>✨ What you can do next:</h3>
    <ul>
      <li>Connect with others who share your interests</li>
      <li>Explore posts from the community</li>
      <li>Share your own journey — one moment at a time</li>
    </ul>

    <p>
      We can’t wait to see what you create.  
      Welcome to the community — and welcome to Connectify!
    </p>

    <p>
      With warm regards,<br />
      <strong>The Connectify Team</strong>
    </p>
  </body>
</html>`,
      }).catch((err) => {
        // log the error for inspection, but don't fail the registration
        console.error("Welcome email failed for", user.email, "error:- ", err);
      });
    }
  } catch (err) {
    return res.json({
      message: "Error In Sending Mail",
    });
  }

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
  console.log("login");
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
  console.log(isPasswordValid);

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
  logoutUser,
};
