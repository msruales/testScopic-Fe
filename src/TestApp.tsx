import React from 'react';
import {Provider} from "react-redux";
import {store} from "./redux/store";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import 'antd/dist/antd.css'
import {configureAbly} from "@ably-labs/react-hooks";
import { v4 as uuid } from 'uuid';
const unique_id = uuid();
configureAbly({ key: process.env.REACT_APP_MIX_ABLY_PUBLIC_KEY, clientId: unique_id });

function TestApp() {
    return (
      <Provider store={store}>
          <React.Suspense fallback={<h1>Loading</h1>} >
              <BrowserRouter>
                  <AppRouter/>
              </BrowserRouter>
          </React.Suspense>
      </Provider>
  );
}

export default TestApp;
