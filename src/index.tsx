import * as React from 'react';
import * as ReactDOM from "react-dom";
import store from './store';
import { Provider } from 'react-redux';
import App from './containers/app';
// import App from './components/App';
// import store from './store/configureStore.prod';
import { init } from './reducers/index';
import { Router, Route, browserHistory } from 'react-router';
// import SendBox from './components/SendBox';
import SendBox from './containers/sendbox';
import Routes from './routes';

// const initialState = init();
// ReactDOM.render(
//     <Provider store={store}>
//         <App />
//     </Provider>
//     , document.getElementById('app')
// );

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Routes}>
                <Route path="send" component={App} />
                <Route path="find" component={SendBox} />
            </Route>
        </Router>
    </Provider>
    , document.getElementById('app')
);
