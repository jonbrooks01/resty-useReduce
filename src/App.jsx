import React, { useState, useEffect } from 'react';

// import './App.scss';

import Footer from './Components/Footer';
import Header from './Components/Header';
import Results from './Components/Results';
import Form from './Components/Form';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [applicationState, setApplicationState] = useState({
    data: null,
    requestParams: {},
  });

  
  useEffect(() => {
    if(!applicationState.requestParams.url || applicationState.data && Object.keys(applicationState.data).length) return;
    console.log(applicationState.requestParams);
    const callApi = async () => {
      setLoading(true);
  
      try {
        const response = await fetch(applicationState.requestParams.url, {
          method: applicationState.requestParams.method,
          body: applicationState.requestParams.method === 'GET' ? null : applicationState.requestParams.requestBody,
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        const data = await response.json();
        setApplicationState((prevState) => ({ ...prevState, data }));
      } catch (error) {
        console.error('Error', error);
      }
      setLoading(false);
    };
      callApi();
  }, [applicationState.requestParams]);


 

  return (
    // <React.Fragment>
    <>
      <Header />
      <div>Request Method: {applicationState.requestParams.method}</div>
      <div>URL: {applicationState.requestParams.url}</div>
      <Form setApplicationState ={setApplicationState}
        applicationState={applicationState} />
      <Results loading={loading} data={applicationState.data} />
      <Footer />
    </>
    //  </React.Fragment>
  );
};

export default App;

// import React from 'react';

// Let's talk about using index.js and some other name in the component folder.
// There's pros and cons for each way of doing this...
// OFFICIALLY, we have chosen to use the Airbnb style guide naming convention.
// Why is this source of truth beneficial when spread across a global organization?
// import Header from './Components/Header';
// import Footer from './Components/Footer';
// import Form from './Components/Form';
// import Results from './Components/Results';

// class App extends React.Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       data: null,
//       requestParams: {},
//     };
//   }

//   callApi = (requestParams) => {
//     // mock output
//     const data = {
//       count: 2,
//       results: [
//         {name: 'fake thing 1', url: 'http://fakethings.com/1'},
//         {name: 'fake thing 2', url: 'http://fakethings.com/2'},
//       ],
//     };
//     this.setState({data, requestParams});
//   }

//   render() {
//     return (
//       <React.Fragment>
//         <Header />
//         <div>Request Method: {this.state.requestParams.method}</div>
//         <div>URL: {this.state.requestParams.url}</div>
//         <Form handleApiCall={this.callApi} />
//         <Results data={this.state.data} />
//         <Footer />
//       </React.Fragment>
//     );
//   }
// }

// export default App;
