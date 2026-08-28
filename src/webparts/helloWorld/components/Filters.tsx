import * as React from 'react';

interface IFiltersProps {
  selectedCategory: string;
  selectedView: string;
  searchText: string;
  onCategoryChange: (value: string) => void;
  onViewChange: (value: string) => void;
  onSearchChange: (value: string) => void;
}

const Filters: React.FC<IFiltersProps> = ({
  selectedCategory,
  selectedView,
  searchText,
  onCategoryChange,
  onViewChange,
  onSearchChange
}) => {

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow:
          '0 2px 8px rgba(0,0,0,0.08)',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '15px'
      }}
    >

      <input
        type="text"
        placeholder="🔍 Search holiday..."
        value={searchText}
        onChange={(e) =>
          onSearchChange(
            e.target.value
          )
        }
        style={{
          width: '300px',
          padding: '10px 15px',
          borderRadius: '8px',
          border: '1px solid #ddd'
        }}
      />

      <select
        value={selectedCategory}
        onChange={(e) =>
          onCategoryChange(
            e.target.value
          )
        }
        style={{
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          minWidth: '220px'
        }}
      >
        <option value="All">
          All Categories
        </option>

        <option value="Public Holiday">
          Public Holiday
        </option>

        <option value="National Holiday">
          National Holiday
        </option>

        <option value="Regional Holiday">
          Regional Holiday
        </option>

        <option value="Optional Holiday">
          Optional Holiday
        </option>

      </select>

      <div
        style={{
          display: 'flex',
          border: '1px solid #ddd',
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      >
        <button
          onClick={() =>
            onViewChange('Card')
          }
          style={{
            backgroundColor:
              selectedView === 'Card'
                ? '#0078d4'
                : '#ffffff',

            color:
              selectedView === 'Card'
                ? '#ffffff'
                : '#000000',

            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer'
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
            backgroundColor:
              selectedView ===
              'Calendar'
                ? '#0078d4'
                : '#ffffff',

            color:
              selectedView ===
              'Calendar'
                ? '#ffffff'
                : '#000000',

            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer'
          }}
        >
          Calendar View
        </button>
      </div>

    </div>
  );

};

export default Filters;