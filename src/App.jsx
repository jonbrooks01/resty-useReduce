import React, { useState, useEffect, useReducer } from 'react';

import './App.scss';

import Footer from './Components/Footer';
import Header from './Components/Header';
import Results from './Components/Results';
import Form from './Components/Form';
import History from './Components/History';

const initialState = {
  loading: false,
  data: {},
  requestParams: {},
  history: [],
};

const appReducer = (state, action) => {
  console.log(action);
  if (action.type === 'START_LOADING') {
    return { ...state, loading: true };
  } else if (action.type === 'END_LOADING') {
    console.log({ ...state, loading: false });
    return { ...state, loading: false };
  } else if (action.type === 'SET_DATA') {
    return { ...state, requestParams: action.requestParams, data: {} };
  } else if (action.type === 'ADD_TO_HISTORY') {
    return {
      ...state,
      data: action.data,
      history: [...state.history, action.history],
    };
    // } else {
    //   return { ...state, requestParams: action.requestParams, data: {} };
  }
};

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  console.log('here');

  useEffect(() => {
    console.log(state);
    if (
      !state.requestParams.url ||
      (state.data && Object.keys(state.data).length) ||
      !state.loading
    )
      return;

    const callApi = async () => {
      try {
        const response = await fetch(state.requestParams.url, {
          method: state.requestParams.method,
          body:
            state.requestParams.method === 'GET'
              ? null
              : state.requestParams.requestBody,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        // dispatch({ type: 'SET_DATA', payload: requestParams });
        dispatch({
          type: 'ADD_TO_HISTORY',
          history: { ...state.requestParams, data },
          data,
        });
      } catch (error) {
        console.error('Error', error);
      }
      dispatch({ type: 'END_LOADING' });
    };

    callApi();
  }, [state]);

  return (
    <>
      <Header />
      <div>Request Method: {state.requestParams.method}</div>
      <div>URL: {state.requestParams.url}</div>
      <div>
        <Form setApplicationState={dispatch} applicationState={state} />

        <Results loading={state.loading} data={state.history} />
      </div>
      <div>
        <History history={state.history} setApplicationState={dispatch} />
      </div>
      <Footer />
    </>
  );
};

export default App;
