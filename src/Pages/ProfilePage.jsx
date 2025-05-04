import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const ProfilePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    dob: "",
    photo: "",
    password: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    dob: "",
    photo: "",
    password: "",
  });

  const handleLogin = () => {
    if (formData.email && formData.password) {
      setUser({
        name: "John Doe",
        email: formData.email,
        phone: "123-456-7890",
        age: "25",
        dob: "1999-01-01",
        photo: "https://i.pravatar.cc/150?img=3", // Placeholder image
        password: formData.password,
      });
      setIsLoggedIn(true);
    } else {
      alert("Please enter email and password");
    }
  };

  const handleSignup = () => {
    if (
      formData.name &&
      formData.email &&
      formData.phone &&
      formData.age &&
      formData.dob &&
      formData.photo &&
      formData.password
    ) {
      setUser(formData);
      setIsLoggedIn(true);
    } else {
      alert("Please fill in all fields");
    }
  };

  const handleLogout = () => {
    setUser({
      name: "",
      email: "",
      phone: "",
      age: "",
      dob: "",
      photo: "",
      password: "",
    });
    setFormData({
      name: "",
      email: "",
      phone: "",
      age: "",
      dob: "",
      photo: "",
      password: "",
    });
    setIsLoggedIn(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Profile</h2>

        {isLoggedIn ? (
          <div className="text-center">
            <img
              src={user.photo}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-2xl font-semibold">{user.name}</h3>
            <p className="text-gray-600 mt-2"><strong>Email:</strong> {user.email}</p>
            <p className="text-gray-600"><strong>Phone:</strong> {user.phone}</p>
            <p className="text-gray-600"><strong>Age:</strong> {user.age}</p>
            <p className="text-gray-600"><strong>Date of Birth:</strong> {user.dob}</p>
            <button
              onClick={handleLogout}
              className="mt-6 w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <h3 className="text-2xl font-semibold text-center mb-4">
              {isSignup ? "Sign Up" : "Login"}
            </h3>

            {isSignup && (
              <>
                <Input label="Name" value={formData.name} onChange={(val) => setFormData({ ...formData, name: val })} />
                <Input label="Phone" value={formData.phone} onChange={(val) => setFormData({ ...formData, phone: val })} />
                <Input label="Age" type="number" value={formData.age} onChange={(val) => setFormData({ ...formData, age: val })} />
                <Input label="Date of Birth" type="date" value={formData.dob} onChange={(val) => setFormData({ ...formData, dob: val })} />
                <Input label="Profile Photo URL" value={formData.photo} onChange={(val) => setFormData({ ...formData, photo: val })} />
              </>
            )}

            <Input label="Email" type="email" value={formData.email} onChange={(val) => setFormData({ ...formData, email: val })} />
            <Input label="Password" type="password" value={formData.password} onChange={(val) => setFormData({ ...formData, password: val })} />

            <button
              onClick={isSignup ? handleSignup : handleLogin}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {isSignup ? "Sign Up" : "Login"}
            </button>

            <div className="flex justify-center mt-4 space-x-4">
              <button className="flex items-center justify-center w-full bg-gray-100 border rounded-lg px-4 py-2 hover:bg-gray-200 transition">
                <FcGoogle className="text-2xl mr-2" /> Google
              </button>
              <button className="flex items-center justify-center w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-800 transition">
                <FaFacebook className="text-2xl mr-2" /> Facebook
              </button>
            </div>

            <p className="text-center mt-4">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <button
                onClick={() => setIsSignup(!isSignup)}
                className="text-blue-500 underline ml-1"
              >
                {isSignup ? "Login" : "Sign Up"}
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const Input = ({ label, type = "text", value, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700 font-bold">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={`Enter your ${label.toLowerCase()}`}
    />
  </div>
);

export default ProfilePage;
