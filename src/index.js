// Basic
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Theme
//import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/themes/bootstrap.cerulean.min.css';

// Screens
import Home from './screens/Home/Home';
import Category from './screens/Category/Category';
import Post from './screens/Post/Post';
import StorePost from './screens/StorePost/StorePost';

// Prepare store
import reducers from './store/reducers';
import middlewares from './store/middlewares';

// Init Store
const store = createStore(reducers, middlewares);

// Render
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path='/' exact={true} component={Home} />
        <Route path="/new-post" component={StorePost} />
        <Route path="/:categoryName" exact={true} component={Category} />
        <Route path="/:categoryName/:postId" exact={true} component={Post} />
        <Route path="/:categoryName/:postId/edit" exact={true} component={StorePost} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
