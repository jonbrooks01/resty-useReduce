import React from "react";

const History = ({ history, setApplicationState }) => {
  const handleHistoryClick = (params) => {
    setApplicationState({ requestParams: params });
  };

  return (
    <div>
      <h2>API Call History</h2>
      <ul>
        {history.map((call, index) => (
          <li key={index}>
            <button onClick={() => handleHistoryClick(call)}>View Results</button>
            <span>{call.method}</span>
            <span>{call.url}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
