import React, { useState, useEffect } from 'react';
import ItineraryDay from './ItineraryDay';

function TripPlanner() {
  // Initialize state with data from localStorage if it exists
  const [trip, setTrip] = useState(() => {
    const savedTrip = localStorage.getItem('tripData');
    return savedTrip ? JSON.parse(savedTrip) : {
      title: '',
      startDate: '',
      endDate: '',
      destination: '',
      itinerary: []
    };
  });

  // Save to localStorage whenever trip data changes
  useEffect(() => {
    localStorage.setItem('tripData', JSON.stringify(trip));
  }, [trip]);

  // Calculate number of days between start and end date
  const calculateDays = () => {
    if (!trip.startDate || !trip.endDate) return [];
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return Array.from({ length: days }, (_, i) => i + 1);
  };

  // Handle activity updates
  const handleActivityUpdate = (day, index, field, value) => {
    setTrip(prevTrip => {
      const newItinerary = [...(prevTrip.itinerary || [])];
      
      // Find or create day entry
      let dayEntry = newItinerary.find(d => d.day === day);
      if (!dayEntry) {
        dayEntry = { day, activities: [] };
        newItinerary.push(dayEntry);
      }

      // Handle different update types
      if (field === 'add') {
        console.log('adding activity')
        dayEntry.activities.push({ time: '', type: '', description: '' });
      } else if (field === 'remove') {
        dayEntry.activities.splice(index, 1);
      } else {  
        dayEntry.activities[index] = {
          ...dayEntry.activities[index],
          [field]: value
        };
      }

      return {
        ...prevTrip,
        itinerary: newItinerary.sort((a, b) => a.day - b.day)
      };
    });
  };

  return (
    <div className="trip-planner">
      <h1>Trip Planner</h1>
      <div className="trip-details">
        <input
          type="text"
          placeholder="Trip Title"
          value={trip.title}
          onChange={(e) => setTrip({...trip, title: e.target.value})}
        />
        <input
          type="date"
          value={trip.startDate}
          onChange={(e) => setTrip({...trip, startDate: e.target.value})}
        />
        <input
          type="date"
          value={trip.endDate}
          onChange={(e) => setTrip({...trip, endDate: e.target.value})}
        />
        <input
          type="text"
          placeholder="Destination"
          value={trip.destination}
          onChange={(e) => setTrip({...trip, destination: e.target.value})}
        />
      </div>

      <div className="itinerary-container">
        {calculateDays().map(day => {
          const currentDate = new Date(trip.startDate); // Create a Date object from the start date
          currentDate.setDate(currentDate.getDate() + day); // Increment the date by (day - 1)

          return (
            <ItineraryDay
              key={day}
              day={currentDate} // Pass the actual date object
              activities={trip.itinerary?.find(d => d.day === day)?.activities || []}
              onUpdateActivities={handleActivityUpdate}
            />
          );
        })}
      </div>

      <button 
        onClick={() => {
          localStorage.removeItem('tripData');
          setTrip({
            title: '',
            startDate: '',
            endDate: '',
            destination: '',
            itinerary: []
          });
        }}
      >
        Clear Trip Data
      </button>
    </div>
  );
}

export default TripPlanner; 