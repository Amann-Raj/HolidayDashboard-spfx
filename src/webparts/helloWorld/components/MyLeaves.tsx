import * as React from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import LeaveService from '../services/LeaveService';
import { ILeaveRequest } from '../models/ILeaveRequest';

interface IMyLeavesProps {
  context: WebPartContext;
  refreshKey: number;
}

const MyLeaves: React.FC<IMyLeavesProps> = ({
  context,
  refreshKey
}) => {

  const [leaves, setLeaves] =
    React.useState<ILeaveRequest[]>([]);

  React.useEffect(() => {

    const loadLeaves = async (): Promise<void> => {

      try {

        const data =
          await LeaveService.getMyLeaves(
            context
          );

        setLeaves(
          data as ILeaveRequest[]
        );

      } catch (error) {

        console.error(
          'My Leaves Error:',
          error
        );

      }

    };

    loadLeaves().catch(
      console.error
    );

  }, [context, refreshKey]);

  return (
    <div
      style={{
        marginTop: '25px',
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow:
          '0 2px 8px rgba(0,0,0,0.08)'
      }}
    >
      <h3
        style={{
          marginTop: 0
        }}
      >
        My Leave Requests
      </h3>

      {
        leaves.length === 0 && (
          <p>
            No leave requests found.
          </p>
        )
      }

      {
        leaves.map((leave) => (

          <div
            key={leave.Id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px 0',
              borderBottom:
                '1px solid #f3f4f6'
            }}
          >
            <div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: '16px'
                }}
              >
                {leave.field_4}
              </div>

              <div
                style={{
                  color: '#666',
                  marginTop: '5px'
                }}
              >
                {
                  new Date(
                    leave.field_2
                  ).toLocaleDateString(
                    'en-IN'
                  )
                }

                {' - '}

                {
                  new Date(
                    leave.field_3
                  ).toLocaleDateString(
                    'en-IN'
                  )
                }
              </div>
            </div>

            <span
              style={{
                backgroundColor:
                  leave.field_5 === 'Approved'
                    ? '#2ecc71'
                    : leave.field_5 === 'Rejected'
                      ? '#e74c3c'
                      : '#f1c40f',

                color:
                  leave.field_5 === 'Pending'
                    ? '#000'
                    : '#fff',

                padding: '10px 22px',
                borderRadius: '25px',
                fontWeight: 600,
                fontSize: '13px',
                minWidth: '110px',
                textAlign: 'center'
              }}
            >
              {leave.field_5}
            </span>

          </div>

        ))
      }

    </div>
  );

};

export default MyLeaves;