import * as React from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import { IHoliday } from '../models/IHoliday';

interface ICalendarViewProps {
  holidays: IHoliday[];
}

const CalendarView: React.FC<ICalendarViewProps> = ({
  holidays
}) => {

  const events = holidays.map((holiday) => {

    let color = '#0078d4';

    switch (holiday.Category) {

      case 'Public Holiday':
        color = '#107c10';
        break;

      case 'National Holiday':
        color = '#0078d4';
        break;

      case 'Regional Holiday':
        color = '#ff8c00';
        break;

      case 'Optional Holiday':
        color = '#d13438';
        break;

      default:
        color = '#605e5c';
        break;

    }

    return {
      title: holiday.Title,
      date: holiday.HolidayDate,
      backgroundColor: color,
      borderColor: color,
      textColor: '#ffffff'
    };
  });

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '10px',
        boxShadow:
          '0 2px 5px rgba(0,0,0,0.1)'
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '15px',
          flexWrap: 'wrap'
        }}
      >
        <span
          style={{
            backgroundColor: '#107c10',
            color: '#fff',
            padding: '5px 10px',
            borderRadius: '5px'
          }}
        >
          Public Holiday
        </span>

        <span
          style={{
            backgroundColor: '#0078d4',
            color: '#fff',
            padding: '5px 10px',
            borderRadius: '5px'
          }}
        >
          National Holiday
        </span>

        <span
          style={{
            backgroundColor: '#ff8c00',
            color: '#fff',
            padding: '5px 10px',
            borderRadius: '5px'
          }}
        >
          Regional Holiday
        </span>

        <span
          style={{
            backgroundColor: '#d13438',
            color: '#fff',
            padding: '5px 10px',
            borderRadius: '5px'
          }}
        >
          Optional Holiday
        </span>
      </div>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto"
        events={events}
      />

    </div>
  );
};

export default CalendarView;