import React from 'react';

const Booksection = () => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', fontSize: '32px', marginTop:"80px", fontWeight: 'bold', color: 'green' }}>
        Book Your Ride Now
      </h1>
      <p style={{ textAlign: 'center', fontSize: '25px', color: 'green' }}>Safar ka naya andaaz</p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '40px', flexWrap: 'wrap' }}>
        {[
          { title:  'Car' },
          { title:  'Bike' },
          { title:  'Auto' },
          { title:  'Riksha' },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ddd',
              padding: '20px',
              borderRadius: '12px',
              width: '220px',
              fontWeight:"bold",
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
            <h2 style={{ fontSize: '20px', color: '#333' }}>{item.title}</h2>
            <p style={{ fontSize: '14px', color: '#555', margin: '10px 0 20px' }}>{item.desc}</p>
            <button
              style={{ 
                backgroundColor: 'green',
                color: '#fff',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
                width:"60px",
                height:"30px",
              }}
            >
              {item.button}
            </button>
          </div>
        ))}
      </div>

      <footer style={{ textAlign: 'center', marginTop: '120px', color: '#777' }}>
        
      </footer>
    </div>
  );
};

export default Booksection;
