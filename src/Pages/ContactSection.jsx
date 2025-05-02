import React, { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    // Reset form if you want
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      message: "",
    });
    // You can also add actual submission logic here (like API call)
  };

  return (
    <div style={{ display: "flex", gap: "2rem", padding: "2rem", flexWrap: "wrap" }}>
      {/* Left Side */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        <img
          src="/contact.png"
          alt="Contact"
          style={{ width: "100%", height: "auto", borderRadius: "12px" }}
        />
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
          <button style={{ padding: "2.5rem 1rem" }}>📞 Call Us</button>
          <button style={{ padding: "0.5rem 1rem" }}>💬 Chat</button>
        </div>
      </div>

      {/* Right Side - Contact Form */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        {isSubmitted ? (
          <div style={{ padding: "2rem", border: "1px solid #ccc", borderRadius: "12px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", textAlign: "center" }}>
            <h2>Thank You!</h2>
            <p>Your message has been sent successfully.</p>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit} 
            style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "1rem", 
              padding: "2rem", 
              border: "1px solid #ccc", 
              borderRadius: "12px", 
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
            }}
          >
            <div style={{ display: "flex", gap: "1rem" }}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                style={{ flex: 1, padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                style={{ flex: 1, padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
              />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
            />
            <textarea
              name="message"
              placeholder="Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              style={{ padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc", resize: "vertical" }}
            ></textarea>
            <button 
              type="submit" 
              style={{ 
                padding: "0.75rem", 
                borderRadius: "6px", 
                backgroundColor: "green", 
                color: "white", 
                border: "none", 
                cursor: "pointer" 
              }}
            >
              Send
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
