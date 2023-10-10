import React, { useState } from 'react';
import Popout from 'react-popout';

const History = ({ history, setApplicationState }) => {
  const [selectedEntry, setSelectedEntry] = useState(null);

  const handleHistoryClick = (entry) => {
    // Update the selected entry in the state
    setSelectedEntry(entry);
  };

  return (
    <div className="historyResults">
      <h2>API Call History</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            <button
              onClick={() => handleHistoryClick(entry)}
              className="historyButton"
            >
              View Results
            </button>
            {entry.method}:{entry.url}
          </li>
        ))}
      </ul>

      {/* Display selected entry information */}
      {selectedEntry && (
        <Popout width="400" height="300">
          <div>
            <h3>Selected Result</h3>

            <pre>{JSON.stringify(selectedEntry.data.results, null, 2)}</pre>
          </div>
        </Popout>
      )}
    </div>
  );
};

export default History;
