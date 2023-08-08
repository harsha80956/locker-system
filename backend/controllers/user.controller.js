const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Controller for user registration
const register = async (req, res) => {
  const { username, email, password, nationality } = req.body;

  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      nationality,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Controller for user login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user in the database by email
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    console.log("req.body", req.body);
    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // // Check if the password matches
    // if (!passwordMatch) {
    //   return res.status(400).json({ error: "Invalid email or password" });
    // }

    // Generate a JWT token for the logged-in user
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
        nationality: user.nationality,
        role: user.role,
      },
      "mysecretkey",
      {
        expiresIn: "1h",
      }
    );

    // Send the token as a response
    res.status(200).json({ token, email: user.email, role: user.role });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Controller to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude the password field from the response
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Controller to get logged-in user details
const getLoggedInUser = async (req, res) => {
  try {
    // The user's ID is available in the request object after authentication middleware
    const userId = req.userId;

    // Find the user by ID and exclude the password field from the response
    const user = await User.findById(userId, { password: 0 });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  getLoggedInUser,
};
