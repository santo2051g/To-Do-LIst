const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { z } = require('zod');

// User details validation schema
const registerSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  year: z.number().int().min(1),
  Department: z.string(),
  email: z.string().email(),
  Age: z.number().int().min(1)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

const updateSchema = z.object({
  username: z.string().min(3).optional(),
  year: z.number().int().min(1).optional(),
  Department: z.string().optional(),
  Age: z.number().int().min(1).optional()
});

// @desc Register a new user
// @route POST /register
exports.registerUser = async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const { username, password, year, Department, email, Age } = validatedData;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      username,
      password: hashedPassword,
      year,
      Department,
      email,
      Age
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        year: user.year,
        Department: user.Department,
        Age: user.Age,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Login a user
// @route POST /login
exports.loginUser = async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { email, password } = validatedData;

    // Check for user
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        year: user.year,
        Department: user.Department,
        Age: user.Age,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc Get user info
// @route GET /getuser
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update user info
// @route PATCH /updateuser
exports.updateUser = async (req, res) => {
  try {
    const validatedData = updateSchema.parse(req.body);
    const user = await User.findByIdAndUpdate(req.user.id, validatedData, { new: true, runValidators: true }).select('-password');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};
