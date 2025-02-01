import React from 'react';
import { ACTIVITY_TYPES } from './constants/activityTypes';

function ItineraryDay({ day, activities, onUpdateActivities }) {
  const dateObj = day instanceof Date ? day : new Date(day);

  // Format the date - assuming day is a Date object
  const formattedDate = dateObj.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const handleAddActivity = () => {
    onUpdateActivities(day,activities.index,'add',)
  };

  return (
    <div className="itinerary-day">
      <div className="day-date">{formattedDate}</div>
      <div className="activities">
        {activities.map((activity, index) => (
          <div key={index} className="activity">
            <input
              type="time"
              value={activity.time}
              onChange={(e) => onUpdateActivities(day, index, 'time', e.target.value)}
            />
            <select
              value={activity.type}
              onChange={(e) => onUpdateActivities(day, index, 'type', e.target.value)}
            >
              <option value="">Select Type</option>
              {ACTIVITY_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <input
              type="text"
              value={activity.description}
              onChange={(e) => onUpdateActivities(day, index, 'description', e.target.value)}
            />
            <button onClick={() => onUpdateActivities(day, index, 'remove')}>Remove</button>
          </div>
        ))}
        <button onClick={handleAddActivity}>Add Activity</button>
      </div>
    </div>
  );
}

export default ItineraryDay; 