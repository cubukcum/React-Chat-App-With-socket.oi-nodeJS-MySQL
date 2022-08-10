import React from "react";
import {BrowserRouter,Routes,Route,NavLink} from "react-router-dom";
import Router from "./Router";
import { Tabs } from 'antd';
const { TabPane } = Tabs;
function App() {
  return (

    <div>


      <Router />

    </div>
  );
}

export default App;