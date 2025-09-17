import React from "react";
import "../common/styles/App.css";
import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "../routes";
import Layout from "../common/layout/Layout";

function App() {
  return (
    <React.Fragment>
      <Routes>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={<Layout>{route.component}</Layout>}
            key={idx}
            exact={true}
          />
        ))}
      </Routes>
    </React.Fragment>
  );
}

export default App;
