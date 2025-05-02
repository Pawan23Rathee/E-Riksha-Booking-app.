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
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      message: "",
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        padding: "2rem",
        flexWrap: "wrap",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Left Side */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        <img
          src="/contact.png"
          alt="Contact"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "12px",
            objectFit: "cover",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "1.5rem",
            padding: "1rem",
            alignItems: "center",
          }}
        >
          <button
            style={{
              padding: "0.75rem 1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#e6f4ea",
              color: "green",
              fontWeight: "bold",
              cursor: "pointer",
              width: "80%",
              justifyContent: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            📞 Call Us: +1 234 567 890
          </button>
          <button
            style={{
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#e6f4ea",
              color: "green",
              fontWeight: "bold",
              cursor: "pointer",
              width: "80%",
              justifyContent: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            💬 Chat
          </button>
        </div>
      </div>

      {/* Right Side - Contact Form */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        {isSubmitted ? (
          <div
            style={{
              padding: "2rem",
              border: "1px solid #ccc",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              backgroundColor: "#f8fff8",
            }}
          >
            <h2 style={{ color: "green" }}>Thank You!</h2>
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
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#ffffff",
            }}
          >
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                style={{
                  flex: 1,
                  minWidth: "120px",
                  padding: "0.75rem",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                style={{
                  flex: 1,
                  minWidth: "120px",
                  padding: "0.75rem",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <textarea
              name="message"
              placeholder="Message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              required
              style={{
                padding: "0.75rem",
                borderRadius: "6px",
                border: "1px solid #ccc",
                resize: "vertical",
              }}
            ></textarea>
            <button
              type="submit"
              style={{
                padding: "0.75rem",
                borderRadius: "6px",
                backgroundColor: "green",
                color: "white",
                fontWeight: "bold",
                border: "none",
                cursor: "pointer",
              }}
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
