import * as React from 'react';

interface IHRKPIsProps {
  pending: number;
  approved: number;
  rejected: number;
}

const cardStyle: React.CSSProperties = {
  flex: 1,
  padding: '20px',
  borderRadius: '12px',
  backgroundColor: '#ffffff',
  boxShadow:
    '0 4px 10px rgba(0,0,0,0.12)'
};

const HRKPIs: React.FC<IHRKPIsProps> = ({
  pending,
  approved,
  rejected
}) => {

  return (
    <div
      style={{
        display: 'flex',
        gap: '15px',
        marginBottom: '20px'
      }}
    >
      <div style={cardStyle}>
        <h4>Pending Requests</h4>

        <h1
          style={{
            color: '#f1c40f'
          }}
        >
          {pending}
        </h1>
      </div>

      <div style={cardStyle}>
        <h4>Approved Requests</h4>

        <h1
          style={{
            color: '#2ecc71'
          }}
        >
          {approved}
        </h1>
      </div>

      <div style={cardStyle}>
        <h4>Rejected Requests</h4>

        <h1
          style={{
            color: '#e74c3c'
          }}
        >
          {rejected}
        </h1>
      </div>
    </div>
  );

};

export default HRKPIs;