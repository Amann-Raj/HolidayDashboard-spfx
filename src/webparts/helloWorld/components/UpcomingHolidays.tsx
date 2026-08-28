import * as React from 'react';
import { IHoliday } from '../models/IHoliday';

interface IUpcomingHolidaysProps {
  holidays: IHoliday[];
  onBookTimeOff: () => void;
}

const UpcomingHolidays: React.FC<IUpcomingHolidaysProps> = ({
  holidays,
  onBookTimeOff
}) => {

  const upcomingHolidays = holidays
    .sort(
      (a, b) =>
        new Date(a.HolidayDate).getTime() -
        new Date(b.HolidayDate).getTime()
    );

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow:
          '0 2px 8px rgba(0,0,0,0.08)'
      }}
    >
      <h2
        style={{
          marginTop: 0,
          fontWeight: 400
        }}
      >
        Upcoming Time Off
      </h2>

      {
        upcomingHolidays.map((holiday) => (

          <div
            key={holiday.Id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '14px 0',
              borderBottom:
                '1px solid #f3f4f6'
            }}
          >
            <div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: '18px'
                }}
              >
                {
                  new Date(
                    holiday.HolidayDate
                  ).toLocaleDateString(
                    'en-IN',
                    {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    }
                  )
                }
              </div>

              <div
                style={{
                  marginTop: '5px',
                  color: '#666'
                }}
              >
                {holiday.Title}
              </div>
            </div>

            <span
              style={{
                backgroundColor: '#2ecc71',
                color: '#fff',
                padding: '10px 22px',
                borderRadius: '30px',
                fontSize: '14px',
                minWidth: '110px',
                textAlign: 'center',
                display: 'inline-block'
              }}
            >
              Approved
            </span>
          </div>

        ))
      }

      <div
        style={{
          marginTop: '20px'
        }}
      >
        <button
          onClick={onBookTimeOff}
          style={{
            background: 'none',
            border: 'none',
            color: '#2563eb',
            fontWeight: 600,
            fontSize: '15px',
            cursor: 'pointer',
            padding: 0
          }}
        >
          Book Time Off +
        </button>
      </div>

    </div>
  );
};

export default UpcomingHolidays;
