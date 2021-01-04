import React, { Suspense, lazy, useReducer } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import update from 'immutability-helper';
import Box from '@material-ui/core/Box';
import CustomerContext from '../lib/context';
import 'primeflex/primeflex.css';

const CustomerList = lazy(() => import('./customers/customers'));
const DetailsPage = lazy(() => import('./details/details'));

const initialState = {
  customer: {},
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_INPUT':
      return update(state, { customer: { $set: action.data } });
    default:
      return initialState;
  }
}


export default function DataDiscovery() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div className="p-grid" style={{ width: '100%', height: '100%'}}>
      <CustomerContext.Provider value={{ state, dispatch }}>
        <Box
          boxShadow={1}
          bgcolor="background.paper"
          m={1}
          p={1}
          style={{ width: '20%', height: '100%' }}>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <CustomerList />
              </Switch>
            </Suspense>
          </Router>
        </Box>
        <Box
          boxShadow={1}
          bgcolor="background.paper"
          m={1}
          p={1}
          style={{ width: '68%', height: '100%' }}>
          <Router>
            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <DetailsPage />
              </Switch>
            </Suspense>
          </Router>
        </Box>
      </CustomerContext.Provider>
    </div>
  );
}