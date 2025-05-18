import React, { useEffect, useState } from "react";

const Bookinghistory = [
  {
    id: "BKG123456",
    date: "2025-05-12",
    car: "Toyota Etios",
    pickup: "Connaught Place, Delhi",
    drop: "IGI Airport, Delhi",
    fare: 850,
    paymentMode: "UPI",
    status: "Completed",
  },
  {
    id: "BKG123457",
    date: "2025-04-20",
    car: "Maruti Swift",
    pickup: "Noida Sector 18",
    drop: "Akshardham Temple",
    fare: 400,
    paymentMode: "Card",
    status: "Cancelled",
  },
];

export default function Bookinghistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    setBookings(mockBookings);
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>My Booking History</h2>
      {bookings.map((booking) => (
        <div
          key={booking.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px",
          }}
        >
          <p><strong>Date:</strong> {booking.date}</p>
          <p><strong>Booking ID:</strong> {booking.id}</p>
          <p><strong>Car:</strong> {booking.car}</p>
          <p><strong>Pickup:</strong> {booking.pickup}</p>
          <p><strong>Drop:</strong> {booking.drop}</p>
          <p><strong>Fare:</strong> ₹{booking.fare}</p>
          <p><strong>Payment:</strong> {booking.paymentMode}</p>
          <p><strong>Status:</strong> {booking.status}</p>
        </div>
      ))}
    </div>
  );
}
