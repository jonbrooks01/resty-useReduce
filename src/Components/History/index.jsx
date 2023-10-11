import React, { useState } from 'react';
import Modal from 'react-modal';

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
        <div className="historyList">
          <h3>Selected Result</h3>

          <pre>{JSON.stringify(selectedEntry.data.results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default History;
