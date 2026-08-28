import * as React from 'react';

interface IKPISectionProps {
  title: string;
  value: number;
}

const KPISection: React.FC<IKPISectionProps> = ({
  title,
  value
}) => {

  let background =
    'linear-gradient(135deg,#0078d4,#106ebe)';

  let icon = '📅';

  if (title === 'Public Holidays') {

    background =
      'linear-gradient(135deg,#1f6feb,#388bfd)';

    icon = '🏖️';

  }

  if (title === 'Upcoming Holidays') {

    background =
      'linear-gradient(135deg,#4895ef,#5aa9ff)';

    icon = '⏳';

  }

  return (
    <div
      style={{
        flex: 1,
        background,
        color: '#ffffff',
        borderRadius: '18px',
        padding: '24px',
        minHeight: '140px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow:
          '0 8px 20px rgba(0,0,0,0.12)',
        transition:
          'transform .2s ease'
      }}
    >
      <div
        style={{
          position: 'absolute',
          right: '18px',
          top: '15px',
          fontSize: '40px',
          opacity: 0.18
        }}
      >
        {icon}
      </div>

      <div
        style={{
          fontSize: '15px',
          fontWeight: 500,
          opacity: 0.95
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: '18px',
          fontSize: '42px',
          fontWeight: 700,
          lineHeight: 1
        }}
      >
        {value}
      </div>

    </div>
  );
};

export default KPISection;