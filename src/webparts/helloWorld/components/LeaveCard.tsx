import * as React from 'react';

interface ILeaveCardProps {
  employeeName: string;
  email: string;
  startDate: string;
  endDate: string;
  leaveType: string;
  status: string;
  department: string;
}

const LeaveCard: React.FC<ILeaveCardProps> = ({
  employeeName,
  email,
  startDate,
  endDate,
  leaveType,
  status,
  department
}) => {

  const badgeColor =
    status === 'Approved'
      ? '#2ecc71'
      : status === 'Rejected'
        ? '#e74c3c'
        : '#f1c40f';

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '15px',
        boxShadow:
          '0 4px 10px rgba(0,0,0,0.12)'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <h3
          style={{
            marginTop: 0
          }}
        >
          {employeeName}
        </h3>

        <span
          style={{
            backgroundColor: badgeColor,
            color:
              status === 'Pending'
                ? '#000'
                : '#fff',
            padding: '8px 18px',
            borderRadius: '20px',
            fontWeight: 600
          }}
        >
          {status}
        </span>
      </div>

      <p>Email: {email}</p>

      <p>Leave Type: {leaveType}</p>

      <p>
        Start Date:{' '}
        {
          new Date(startDate)
            .toLocaleDateString('en-IN')
        }
      </p>

      <p>
        End Date:{' '}
        {
          new Date(endDate)
            .toLocaleDateString('en-IN')
        }
      </p>

      <p>
        Department: {department}
      </p>
    </div>
  );
};

export default LeaveCard;