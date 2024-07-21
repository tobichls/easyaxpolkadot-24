// src/components/QueryInput.js
import React, { useState } from 'react';

function QueryInput({ onQuery }) {
  const [query, setQuery] = useState('');

  const handleQuery = () => {
    onQuery(query);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter your query"
      />
      <button onClick={handleQuery}>Query</button>
    </div>
  );
}

export default QueryInput;
