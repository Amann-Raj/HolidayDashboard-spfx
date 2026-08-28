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
          vacation: 12 - vacationUsed,
          casual: 5 - casualUsed,
          sick: 10 - sickUsed,
          optional: 2 - optionalUsed
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
      bg: '#EEF4FF',
      text: '#2563EB'
    },
    {
      name: 'Casual Leave',
      days: balances.casual,
      bg: '#ECFDF5',
      text: '#059669'
    },
    {
      name: 'Sick Leave',
      days: balances.sick,
      bg: '#FFF7ED',
      text: '#EA580C'
    },
    {
      name: 'Optional Holiday',
      days: balances.optional,
      bg: '#F5F3FF',
      text: '#7C3AED'
    }
  ];

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '20px',
        boxShadow:
          '0 2px 8px rgba(0,0,0,0.08)'
      }}
    >
      <h3
        style={{
          marginTop: 0,
          marginBottom: '20px',
          color: '#323130'
        }}
      >
        💼 My Leave Balances
      </h3>

      {
        rows.map((row) => (

          <div
            key={row.name}
            style={{
              display: 'flex',
              justifyContent:
                'space-between',
              alignItems: 'center',
              padding: '14px 0',
              borderBottom:
                '1px solid #f3f4f6'
            }}
          >
            <div
              style={{
                fontSize: '14px',
                color: '#323130',
                fontWeight: 500
              }}
            >
              {row.name}
            </div>

            <span
              style={{
                backgroundColor:
                  row.bg,
                color: row.text,
                padding:
                  '8px 14px',
                borderRadius: '999px',
                fontSize: '13px',
                fontWeight: 600,
                minWidth: '90px',
                textAlign: 'center'
              }}
            >
              {row.days} Days
            </span>
          </div>

        ))
      }

    </div>
  );

};

export default LeaveBalance;