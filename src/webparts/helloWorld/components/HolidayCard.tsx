import * as React from 'react';

interface IHolidayCardProps {
  title: string;
  date: string;
  category: string;
  description: string;
  onClick?: () => void;
}

const HolidayCard: React.FC<IHolidayCardProps> = ({
  title,
  date,
  category,
  description,
  onClick
}) => {

  const formattedDate =
    new Date(date).toLocaleDateString(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }
    );

  return (
    <div
      onClick={onClick}
      style={{
        border: '1px solid #e1dfdd',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '15px',
        backgroundColor: '#ffffff',
        cursor: 'pointer',
        boxShadow:
          '0 2px 8px rgba(0,0,0,0.08)'
      }}
    >
      <h3>{title}</h3>

      <p>
        <strong>Date:</strong>{' '}
        {formattedDate}
      </p>

      <p>
        <strong>Category:</strong>{' '}
        {category}
      </p>

      <p>
        <strong>Description:</strong>{' '}
        {description}
      </p>
    </div>
  );
};

export default HolidayCard;