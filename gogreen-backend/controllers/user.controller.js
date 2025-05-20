require("dotenv").config();
const User = require("../modles/user.modle");
const bcrypt = require("bcryptjs");
const cloudinary = require("../config/cloudinary");
const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
 try {
 const { email, password } = req.body;
 

 if(await User.findOne({ email })) {
 return res.status(400).json({ message: "User already exists" });
 }

 const avatarUrl = req.file
 ? (await cloudinary.uploader.upload(req.file.path)).secure_urla
 : "";
 const hashedPassword = await bcrypt.hash(password, 10);

 const user = await new User({
 email,
 password: hashedPassword,
 avatar: avatarUrl,
 }).save();
 res.status(201).json({ message: "User registered successfully", user });
 } catch (err) {
 res.status(500).json({ message: err.message });
 }
};

 //Login User
exports.login = async (req, res) => {
 try {
 const { email, password } = req.body;
 
 const user = await User.findOne({ email });
 if (!user) return res.status(400).json({ message: "Invalid credentials" });
 
 const isMatch = await bcrypt.compare(password, user.password);
 if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
 
 const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
 expiresIn: "1h",
 });
 
 res.json({ token, user });
 } catch (err) {
 res.status(500).json({ message: err.message });
 } };

// new Add

const sendEmail = require("../utils/sendemail");
// Forgot Password
 exports.forgotPassword = async (req, res) => {
 try {
 const { email } = req.body;
 const user = await User.findOne({ email });

 if (!user) return res.status(400).json({ message: "User not found" });

const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" });

 user.resetToken = resetToken;
 user.resetTokenExpiry = Date.now() + 900000; // 15 minutes expiry
 await user.save();

 const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

 await sendEmail(email, "Password Reset", `Click here to reset your password: ${resetLink}`);

 res.json({ message: "Reset link sent to email" });
 } catch (err) {
 res.status(500).json({ message: err.message });
 }
};
  
 // Reset Password
  exports.resetPassword = async (req, res) => {
     try {
     const { token, newPassword } = req.body;
     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
     const user = await User.findOne({ _id: decoded.userId, resetToken: token });
    
     if (!user || user.resetTokenExpiry < Date.now()) {
     return res.status(400).json({ message: "Invalid or expired token" });
     }
    
     user.password = await bcrypt.hash(newPassword, 10);
     user.resetToken = undefined;
     user.resetTokenExpiry = undefined;
     await user.save();
    
     res.json({ message: "Password reset successfully" });
     } catch (err) {
     res.status(500).json({ message: err.message });
     }
    };