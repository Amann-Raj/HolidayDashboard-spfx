import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import LeaveService from '../services/LeaveService';

interface ILeaveBalanceProps {
  context: WebPartContext;
}

const LeaveBalance: React.FC<ILeaveBalanceProps> = ({
  context
}) => {

  const [balances, setBalances] =
    React.useState({
      vacation: 12,
      casual: 5,
      sick: 10,
      optional: 2
    });

  const [activeItem, setActiveItem] =
    React.useState('Vacation');

  const [hoveredColor, setHoveredColor] =
    React.useState('#2563EB');

  const [chartHovered, setChartHovered] =
    React.useState(false);

  React.useEffect(() => {

    const loadBalances = async (): Promise<void> => {

      try {

        const leaves =
          await LeaveService.getMyLeaves(
            context
          );

        let vacationUsed = 0;
        let casualUsed = 0;
        let sickUsed = 0;
        let optionalUsed = 0;

        leaves.forEach((leave: any) => {

          if (
            leave.field_5 !== 'Approved'
          ) {
            return;
          }

          const start =
            new Date(leave.field_2);

          const end =
            new Date(leave.field_3);

          const days =
            Math.ceil(
              (
                end.getTime() -
                start.getTime()
              ) /
              (
                1000 *
                60 *
                60 *
                24
              )
            ) + 1;

          switch (leave.field_4) {

            case 'Vacation':
              vacationUsed += days;
              break;

            case 'Casual Leave':
              casualUsed += days;
              break;

            case 'Sick Leave':
              sickUsed += days;
              break;

            case 'Optional Holiday':
              optionalUsed += days;
              break;

          }

        });

        setBalances({
          vacation:
            Math.max(
              12 - vacationUsed,
              0
            ),

          casual:
            Math.max(
              5 - casualUsed,
              0
            ),

          sick:
            Math.max(
              10 - sickUsed,
              0
            ),

          optional:
            Math.max(
              2 - optionalUsed,
              0
            )
        });

      } catch (error) {

        console.error(error);

      }

    };

    loadBalances().catch(
      console.error
    );

  }, [context]);

  const rows = [
    {
      name: 'Vacation',
      days: balances.vacation,
      color: '#2563EB',
      bg: '#EEF4FF'
    },
    {
      name: 'Casual Leave',
      days: balances.casual,
      color: '#10B981',
      bg: '#ECFDF5'
    },
    {
      name: 'Sick Leave',
      days: balances.sick,
      color: '#F97316',
      bg: '#FFF7ED'
    },
    {
      name: 'Optional Holiday',
      days: balances.optional,
      color: '#8B5CF6',
      bg: '#F5F3FF'
    }
  ];

  const totalDays =
    balances.vacation +
    balances.casual +
    balances.sick +
    balances.optional;

  const vacationPercentage =
    totalDays > 0
      ? (balances.vacation / totalDays) * 100
      : 0;

  const casualPercentage =
    totalDays > 0
      ? (balances.casual / totalDays) * 100
      : 0;

  const sickPercentage =
    totalDays > 0
      ? (balances.sick / totalDays) * 100
      : 0;

  const vacationEnd =
    vacationPercentage;

  const casualEnd =
    vacationEnd +
    casualPercentage;

  const sickEnd =
    casualEnd +
    sickPercentage;

  const donutBackground =
    totalDays === 0
      ? '#E5E7EB'
      : `conic-gradient(
        #2563EB 0% ${vacationEnd}%,
        #10B981 ${vacationEnd}% ${casualEnd}%,
        #F97316 ${casualEnd}% ${sickEnd}%,
        #8B5CF6 ${sickEnd}% 100%
      )`;

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '18px',
        padding: '24px',
        boxShadow:
          '0 4px 16px rgba(0,0,0,0.08)'
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: '24px',
          fontSize: '22px',
          color: '#323130'
        }}
      >
        💼 My Leave Balances
      </h3>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
          flexWrap: 'wrap'
        }}
      >

        {/* DONUT */}

        <div
          style={{
            textAlign: 'center'
          }}
        >
          <div
            onMouseEnter={() =>
              setChartHovered(true)
            }
            onMouseLeave={() =>
              setChartHovered(false)
            }
            style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',

              background:
                donutBackground,

              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',

              transition:
                'all .3s ease',

              transform:
                chartHovered
                  ? 'scale(1.08)'
                  : 'scale(1)',

              boxShadow:
                chartHovered
                  ? `0 0 30px ${hoveredColor}55`
                  : '0 8px 24px rgba(0,0,0,0.12)'
            }}
          >
            <div
              style={{
                width: '105px',
                height: '105px',
                borderRadius: '50%',
                backgroundColor: '#ffffff',

                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  fontSize: '30px',
                  fontWeight: 700,
                  color:
                    totalDays === 0
                      ? '#EF4444'
                      : '#323130'
                }}
              >
                {Math.max(totalDays, 0)}
              </div>

              <div
                style={{
                  color:
                    totalDays === 0
                      ? '#EF4444'
                      : '#666',

                  fontSize: '13px'
                }}
              >
                {
                  totalDays === 0
                    ? 'No Balance'
                    : 'Days Left'
                }
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div
          style={{
            width: '320px',
            maxWidth: '100%'
          }}
        >
          {
            rows.map((row) => (

              <div
                key={row.name}
                onMouseEnter={() => {

                  setActiveItem(
                    row.name
                  );

                  setHoveredColor(
                    row.color
                  );

                }}
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    '1fr auto',

                  alignItems: 'center',

                  padding: '12px 14px',

                  marginBottom: '10px',

                  borderRadius: '14px',

                  backgroundColor:
                    activeItem === row.name
                      ? row.bg
                      : '#FAFAFA',

                  transform:
                    activeItem === row.name
                      ? 'translateX(6px)'
                      : 'translateX(0)',

                  boxShadow:
                    activeItem === row.name
                      ? '0 6px 14px rgba(0,0,0,0.08)'
                      : 'none',

                  transition:
                    'all .25s ease',

                  cursor: 'pointer'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <div
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor:
                        row.color
                    }}
                  />

                  <span
                    style={{
                      fontSize: '15px',
                      fontWeight: 500
                    }}
                  >
                    {row.name}
                  </span>
                </div>

                <span
                  style={{
                    backgroundColor:
                      row.bg,

                    color:
                      row.color,

                    padding:
                      '8px 14px',

                    borderRadius:
                      '999px',

                    fontWeight: 600,

                    fontSize: '13px',

                    minWidth: '90px',

                    textAlign: 'center'
                  }}
                >
                  {
                    row.days <= 0
                      ? 'Exhausted'
                      : `${row.days} Days`
                  }
                </span>
              </div>

            ))
          }
        </div>

      </div>
    </div>
  );

};

export default LeaveBalance;