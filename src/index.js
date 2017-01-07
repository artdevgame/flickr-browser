import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, hashHistory } from 'react-router'
import reducers from './reducers';
import App from './components/app';
import Error from './components/error';
import './normalize.css';
import './index.css';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const getRoutes = (store) => {
	const hasError = (nextState, replace) => {
		const state = store.getState();
		if (state.error.hasError) {
			replace('/oops');
		}
	}

	return (
		<Route>
			<Route path="/tags/:tag" component={App} onEnter={hasError} />
			<Route path="/" component={App} onEnter={hasError} />
			<Route path="*" component={Error} />
		</Route>
	);
};

ReactDOM.render(
	<Provider store={ store }>
		<Router history={hashHistory}>
			{getRoutes(store)}
		</Router>
	</Provider>,
	document.getElementById('root')
);