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

  const upcomingHolidays = [...holidays]
    .sort(
      (a, b) =>
        new Date(a.HolidayDate).getTime() -
        new Date(b.HolidayDate).getTime()
    );

  const groupedHolidays =
    upcomingHolidays.reduce(
      (
        groups: {
          [key: string]: IHoliday[];
        },
        holiday
      ) => {

        const monthYear =
          new Date(
            holiday.HolidayDate
          ).toLocaleDateString(
            'en-IN',
            {
              month: 'long',
              year: 'numeric'
            }
          );

        if (!groups[monthYear]) {
          groups[monthYear] = [];
        }

        groups[monthYear].push(
          holiday
        );

        return groups;

      },
      {}
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}
      >
        <h2
          style={{
            margin: 0,
            fontWeight: 600
          }}
        >
          Upcoming Time Off
        </h2>

      </div>

      <div
        style={{
          maxHeight: '500px',
          overflowY: 'auto',
          paddingRight: '8px'
        }}
      >
        {
          Object.keys(
            groupedHolidays
          ).map((month) => (

            <div
              key={month}
            >
              <div
                style={{
                  position: 'sticky',
                  top: 0,
                  backgroundColor:
                    '#ffffff',
                  zIndex: 1,
                  fontWeight: 700,
                  fontSize: '16px',
                  color: '#2563EB',
                  padding:
                    '10px 0',
                  borderBottom:
                    '2px solid #EEF2FF'
                }}
              >
                {month}
              </div>

              {
                groupedHolidays[
                  month
                ].map(
                  (holiday) => (

                    <div
                      key={
                        holiday.Id
                      }
                      style={{
                        display:
                          'flex',
                        justifyContent:
                          'space-between',
                        alignItems:
                          'center',
                        padding:
                          '14px 0',
                        borderBottom:
                          '1px solid #f3f4f6'
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontWeight:
                              600,
                            fontSize:
                              '17px'
                          }}
                        >
                          {
                            new Date(
                              holiday.HolidayDate
                            ).toLocaleDateString(
                              'en-IN',
                              {
                                day: 'numeric',
                                month: 'long'
                              }
                            )
                          }
                        </div>

                        <div
                          style={{
                            marginTop:
                              '5px',
                            color:
                              '#666'
                          }}
                        >
                          {
                            holiday.Title
                          }
                        </div>
                      </div>

                      <span
                        style={{
                          backgroundColor:
                            '#2ecc71',
                          color:
                            '#fff',
                          padding:
                            '10px 22px',
                          borderRadius:
                            '30px',
                          fontSize:
                            '14px',
                          minWidth:
                            '110px',
                          textAlign:
                            'center',
                          display:
                            'inline-block'
                        }}
                      >
                        Approved
                      </span>
                    </div>

                  )
                )
              }

            </div>

          ))
        }
      </div>

    </div>
  );
};

export default UpcomingHolidays;