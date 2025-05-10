import React from 'react';
import { FaCar, FaMotorcycle, FaTaxi, FaShuttleVan } from 'react-icons/fa';

const Booksection = () => {
  const items = [
    { title: 'Car', icon: <FaCar size={40} color="green" />, button: 'Book' },
    { title: 'Bike', icon: <FaMotorcycle size={40} color="green" />, button: 'Book' },
    { title: 'Auto', icon: <FaTaxi size={40} color="green" />, button: 'Book' },
    { title: 'Riksha', icon: <FaShuttleVan size={40} color="green" />, button: 'Book' },
  ];

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '32px', marginTop: '80px', fontWeight: 'bold', color: 'green' }}>
        Book Your Ride Now
      </h1>
      <p style={{ textAlign: 'center', fontSize: '25px', color: 'green' }}>Safar ka naya andaaz</p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '40px', flexWrap: 'wrap' }}>
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              border: '1px solid green',
              padding: '20px',
              borderRadius: '12px',
              width: '220px',
              textAlign: 'center',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
            }}
          >
            <div style={{ marginBottom: '15px' }}>{item.icon}</div>
            <h2 style={{ fontSize: '20px', color: '#333' }}>{item.title}</h2>
            <button
              style={{
                backgroundColor: 'green',
                color: '#fff',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '70px',
                height: '40px',
                marginTop: '15px',
              }}
            >
              {item.button}
            </button>
          </div>
        ))}
      </div>

      <footer style={{ textAlign: 'center', marginTop: '120px', color: '#777' }}></footer>
    </div>
  );
};

export default Booksection;
