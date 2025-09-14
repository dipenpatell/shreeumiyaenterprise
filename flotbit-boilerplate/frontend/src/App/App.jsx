import React from 'react';
import "../common/styles/App.css";
import { Route, Routes } from 'react-router-dom';
import { authProtectedRoutes, publicRoutes } from '../routes';
import AppRoute from '../routes/route';
import Layout from '../common/layout';

function App() {
  return (
      <React.Fragment>
      <Routes>
          {publicRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={route.component}
              key={idx}
              exact={true}
            />
          ))}

          {authProtectedRoutes.map((route, idx) => (
            <Route
              path={route.path}
              element={
                <AppRoute>
                  {/* {route.component} */}
                  <Layout>{route.component}</Layout>
                </AppRoute>
              }
              key={idx}
              exact={true}
            />
          ))}
        </Routes>
    </React.Fragment>
  );
}

export default App;
