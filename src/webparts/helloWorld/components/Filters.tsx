import * as React from 'react';

interface IFiltersProps {
  selectedCategory: string;
  selectedView: string;
  onCategoryChange: (value: string) => void;
  onViewChange: (value: string) => void;
}

const Filters: React.FC<IFiltersProps> = ({
  selectedCategory,
  selectedView,
  onCategoryChange,
  onViewChange
}) => {

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        padding: '24px',
        borderRadius: '16px',
        boxShadow:
          '0 4px 16px rgba(0,0,0,0.08)',
        marginTop: '10px'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px'
        }}
      >
        <select
          value={selectedCategory}
          onChange={(e) =>
            onCategoryChange(
              e.target.value
            )
          }
          style={{
            minWidth: '260px',
            padding: '12px',
            borderRadius: '10px',
            border: '1px solid #ddd',
            fontSize: '14px'
          }}
        >
          <option value="All">
            All Categories
          </option>

          <option value="Public Holiday">
            Public Holiday
          </option>

          <option value="Optional Holiday">
            Optional Holiday
          </option>
        </select>

        <div
          style={{
            display: 'flex',
            borderRadius: '10px',
            overflow: 'hidden',
            border: '1px solid #ddd'
          }}
        >
          <button
            onClick={() =>
              onViewChange('Card')
            }
            style={{
              padding: '12px 24px',
              border: 'none',
              cursor: 'pointer',

              backgroundColor:
                selectedView === 'Card'
                  ? '#0078d4'
                  : '#ffffff',

              color:
                selectedView === 'Card'
                  ? '#ffffff'
                  : '#323130',

              fontWeight: 600
            }}
          >
            Card View
          </button>

          <button
            onClick={() =>
              onViewChange(
                'Calendar'
              )
            }
            style={{
              padding: '12px 24px',
              border: 'none',
              cursor: 'pointer',

              backgroundColor:
                selectedView === 'Calendar'
                  ? '#0078d4'
                  : '#ffffff',

              color:
                selectedView === 'Calendar'
                  ? '#ffffff'
                  : '#323130',

              fontWeight: 600
            }}
          >
            Calendar View
          </button>
        </div>
      </div>
    </div>
  );

};

export default Filters;