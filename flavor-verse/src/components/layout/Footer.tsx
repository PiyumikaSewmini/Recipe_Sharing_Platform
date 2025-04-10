import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#D9D9D1',
        color: '#21381E',
        borderTop: '1px solid #21381E',
        textAlign: 'center',
        padding: '10px 0',
        position: 'relative',
      }}
    >
      <p style={{ margin: 0 }}>
        Copyright &copy; 2025 All rights reserved. Powered by FlavorVerse.
      </p>
    </footer>
  );
};

export default Footer;
