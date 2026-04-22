import React from 'react';

const BookingWidget: React.FC = () => {
  const handleBooking = () => {
    // Logic for handling booking
  };

  return (
    <div className="booking-widget">
      <h2>Book Your Trip</h2>
      <form onSubmit={handleBooking}>
        <div>
          <label htmlFor="destination">Destination:</label>
          <input type="text" id="destination" name="destination" required />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input type="date" id="date" name="date" required />
        </div>
        <div>
          <label htmlFor="guests">Number of Guests:</label>
          <input type="number" id="guests" name="guests" min="1" required />
        </div>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default BookingWidget;
