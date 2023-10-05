import React, { useState, useEffect, useReducer } from 'react';

import './App.scss';

import Footer from './Components/Footer';
import Header from './Components/Header';
import Results from './Components/Results';
import Form from './Components/Form';
import History from './Components/History';

const initialState = {
  loading: false,
  data: null,
  requestParams: {},
  history: []
};

const appReducer = (state, action) => {
  switch(action.type) {
    case 'START_LOADING':
      return { ...state, loading: true };
    case 'END_LOADING':
      return { ...state, loading: false};
    case 'SET_DATA':
      return { ...state, data: action.payload };
    case 'SET_REQUEST_PARAMS':
      return { ...state, history: [...state.history, action.payload] };
    case 'ADD_TO_HISTORY':
      return { ...state, history: [...state.history, action.payload] }  
    default:
        return state;  
  }
}



const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);
 

  
  useEffect(() => {
    if (!state.requestParams.url || (state.data && Object.keys(state.data).length)) return;
    
    const callApi = async () => {
     dispatch({ type: 'START_LOADING' });
  
      try {
        const response = await fetch(state.requestParams.url, {
          method: state.requestParams.method,
          body: state.requestParams.method === 'GET' ? null : state.requestParams.requestBody,
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
       dispatch({ type: 'SET_DATA', payload: data });
       dispatch({ type: 'ADD_TO_HISTORY', payload: { ...state.requestParams, data} });
      } catch (error) {
        console.error('Error', error);
      }
      dispatch({ type: 'END_LOADING' });
    };
      callApi();
  }, [state.requestParams]);


 

  return (
    // <React.Fragment>
    <>
      <Header />
      <div>Request Method: {state.requestParams.method}</div>
      <div>URL: {state.requestParams.url}</div>
      <Form setApplicationState ={dispatch}
        applicationState={state} />
      <Results loading={state.loading} data={state.data} />
      <History history={state.history} setApplicationState={dispatch} />
      <Footer />
    </>
    //  </React.Fragment>
  );
};

export default App;


