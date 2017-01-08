import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, browserHistory } from 'react-router'
import reducers from './reducers';
import HomeScreen from './screens/home';
import TagsScreen from './screens/tags';
import SearchResultsScreen from './screens/search-results';
import NotFoundScreen from './screens/404';
import './normalize.css';
import './index.css';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const getRoutes = (store) => {
	return (
		<Route>
			<Route path="/" component={HomeScreen} />
			<Route path="/search/:pattern" component={SearchResultsScreen} />
			<Route path="/tags/:tag" component={TagsScreen} />
			<Route path="*" component={NotFoundScreen} />
		</Route>
	);
};

ReactDOM.render(
	<Provider store={ store }>
		<Router history={browserHistory}>
			{getRoutes(store)}
		</Router>
	</Provider>,
	document.getElementById('root')
);