import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} Smart Travel Planner. All rights
          reserved.
        </p>
        <p>Follow us on social media!</p>
      </div>
    </footer>
  );
};

export default Footer;
