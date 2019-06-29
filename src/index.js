import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import App from './main/App';
import storeConfig from './store/storeConfig'

import '../node_modules/bootstrap/dist/css/bootstrap.css'

const store = storeConfig()

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
