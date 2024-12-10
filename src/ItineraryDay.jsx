import React from 'react';
import { ACTIVITY_TYPES } from './constants/activityTypes';

function ItineraryDay({ day, activities, onUpdateActivities }) {
  return (
    <div className="itinerary-day">
      <h3>Day {day}</h3>
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
          </div>
        ))}
        <button onClick={() => onUpdateActivities(day, activities.length, 'add')}>
          Add Activity
        </button>
      </div>
    </div>
  );
}

export default ItineraryDay; 