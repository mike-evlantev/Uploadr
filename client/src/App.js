import React, { Fragment } from "react";
import "./App.css";
//import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Upload } from "./components/Upload";

const App = () => {
  return(
    <Fragment>
      <div className="page-container h-100">
        <h5 className="text-center text-primary m-4">
          <i className="fas fa-file-upload"></i>
          &nbsp;<span>Uploadr</span>
        </h5>
        <Upload/>
      </div>
    </Fragment>
  );
}

export default App;
