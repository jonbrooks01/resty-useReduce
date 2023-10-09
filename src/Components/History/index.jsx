import React, { useState } from 'react';
import Popout from 'react-popout'

const History = ({ history, setApplicationState }) => {
  const [selectedEntry, setSelectedEntry] = useState(null);

  const handleHistoryClick = (entry) => {
    // Update the selected entry in the state
    setSelectedEntry(entry);
  };

  return (
    <div>
      <h2>API Call History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            {entry.method}:{entry.url}
            <button onClick={() => handleHistoryClick(entry)}>
              View Results
            </button>
          </li>
        ))}
      </ul>

      {/* Display selected entry information */}
      {selectedEntry && (
        <Popout >
        <div>
          <h3>Selected Result</h3>
          <ul>
            <li>{JSON.stringify(selectedEntry.data.results, null, 2)}</li>
          </ul>
        </div>
        </Popout>
      )}
    </div>
  );
};

export default History;
