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
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

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

  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (chatInput.trim()) {
      setChatMessages((prev) => [...prev, { text: chatInput, sender: "user" }]);
      setChatInput("");
      // Optional: Add a dummy reply from system
      setTimeout(() => {
        setChatMessages((prev) => [...prev, { text: "Thanks for your message! We'll reply soon.", sender: "system" }]);
      }, 1000);
    }
  };

  return (
    <div style={{ display: "flex", gap: "2rem", padding: "2rem", flexWrap: "wrap" }}>
      {/* Left Side */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        <img
          src="/contact.png"
          alt="Contact"
          style={{ width: "70%", height: "auto", borderRadius: "12px", marginLeft: "80px" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: "5rem",
            padding: "1rem",
            borderRadius: "12px",
            alignItems: "stretch",
            width: "80%",
            marginLeft: "50px",
          }}
        >
          <button
            style={{
              padding: "0.75rem 1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              borderRadius: "6px",
              border: "1px solid green",
              cursor: "pointer",
              backgroundColor: "#f0f0f0",
              width: "50%",
              marginLeft: "100px",
            }}
          >
            📞 Call Us: +1 234 567 890
          </button>
          <button
            onClick={() => setShowChat((prev) => !prev)}
            style={{
              padding: "0.75rem 1rem",
              borderRadius: "6px",
              border: "1px solid green",
              cursor: "pointer",
              marginLeft: "100px",
              backgroundColor: "#f0f0f0",
              width: "50%",
            }}
          >
            💬 Chat
          </button>
        </div>
        {showChat && (
          <div
            style={{
              marginTop: "1rem",
              marginLeft: "50px",
              width: "80%",
              border: "1px solid green",
              borderRadius: "12px",
              padding: "1rem",
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            <div style={{ marginBottom: "1rem" }}>
              {chatMessages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: msg.sender === "user" ? "right" : "left",
                    margin: "0.5rem 0",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "0.5rem 1rem",
                      borderRadius: "12px",
                      backgroundColor: msg.sender === "user" ? "#d1ffd1" : "#f0f0f0",
                    }}
                  >
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
            <form onSubmit={handleChatSubmit} style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Type your message..."
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: "1px solid green",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  backgroundColor: "green",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Right Side - Contact Form */}
      <div style={{ flex: 1, minWidth: "300px" }}>
        {isSubmitted ? (
          <div
            style={{
              padding: "2rem",
              border: "1px solid green",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
            }}
          >
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
              border: "1px solid green",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
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
                style={{
                  flex: 1,
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: "1px solid green",
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
                  padding: "0.5rem",
                  borderRadius: "6px",
                  border: "1px solid green",
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
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid green",
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
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid green",
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
                padding: "0.5rem",
                borderRadius: "6px",
                border: "1px solid green",
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
                border: "none",
                cursor: "pointer",
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
