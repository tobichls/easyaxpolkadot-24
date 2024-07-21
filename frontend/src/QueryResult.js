// src/components/QueryResult.js
import React from 'react';

function QueryResult({ result }) {
  return (
    <div>
      <h2>Query Result</h2>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  );
}

export default QueryResult;
