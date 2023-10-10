import { useState } from 'react';
import './Form.scss';

const Form = ({ applicationState, setApplicationState }) => {
  const [formData, setFormData] = useState({
    method: 'GET',
    url: '',
    requestBody: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMethodChange = (method) => {
    setFormData({
      ...formData,
      method: method,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = { ...formData };
    // setApplicationState({ type: 'ADD_TO_HISTORY', history: userData });
    setApplicationState({ type: 'SET_DATA', requestParams: userData });
    setApplicationState({ type: 'START_LOADING' });
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span className="url">URL: </span>
          <input
            name="url"
            type="text"
            value={formData.url}
            placeholder="URL: "
            data-testid="formInput"
            onChange={handleClick}
          />
          <button data-testid="goButton" type="submit">
            GO!
          </button>
        </label>
        <label className="methods">
          <span
            id="get"
            className={formData.method === 'GET' ? 'active' : ''}
            onClick={() => handleMethodChange('GET')}
          >
            GET
          </span>

          <span
            id="post"
            className={formData.method === 'POST' ? 'active' : ''}
            onClick={() => handleMethodChange('POST')}
          >
            POST
          </span>
          <span
            id="put"
            className={formData.method === 'PUT' ? 'active' : ''}
            onClick={() => handleMethodChange('PUT')}
          >
            PUT
          </span>
          <span
            id="delete"
            className={formData.method === 'DELETE' ? 'active' : ''}
            onClick={() => handleMethodChange('DELETE')}
          >
            DELETE
          </span>
        </label>
        <label className="userInput">
          <span className="requestBody">Request Body (JSON):</span>
          <textarea
            name="requestBody"
            value={formData.requestBody}
            onChange={handleClick}
            rows={4}
          />
        </label>
        {/* Display loading status */}
        {isLoading && <p>Loading...</p>}
      </form>
    </>
  );
};

export default Form;
