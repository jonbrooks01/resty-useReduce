import React, { useState } from "react";

import "./App.scss";

import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Results from "./Components/Results";
import Form from "./Components/Form";

const App = () => {
  const [ applicationState, setApplicationState] = useState({
    data: null,
    requestParams: {},
  });

  const callApi = () => {
    // mock output
    const newData = {
      count: 2,
      results: [
        { name: "fake thing 1", url: "http://fakethings.com/1" },
        { name: "fake thing 2", url: "http://fakethings.com/2" },
      ],
    };
    setApplicationState({ ...applicationState, data: newData });
  }

  return (
    // <React.Fragment>
    <>
      <Header />
      <div>Request Method: {applicationState.requestParams.method}</div>
      <div>URL: {applicationState.requestParams.url}</div>
      <Form handleApiCall={callApi} />
      <Results data={applicationState.data} />
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
