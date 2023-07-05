import React, { useState } from 'react';

const SearchBar = (props) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    props.onSearch(searchQuery);
  };

  return (
    <div style={{ marginBottom: '10px', display: 'flex' }}>
      <input
        type="text"
        placeholder="Enter a location"
        value={searchQuery}
        style={{ width: '300px', height: '40px' }}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button
        style={{
          marginLeft: '10px',
          background: 'transparent',
          color: 'black',
          border: '0.5px solid black',
          padding: '0.25rem',
          borderRadius: '4px',
          cursor: 'pointer',

        }}
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
