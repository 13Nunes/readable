// Basic
import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Theme
import 'bootstrap/dist/css/bootstrap.min.css';

// Styles
import './App.css';

// Screens
import Home from './screens/Home/Home';
import Category from './screens/Category/Category';
import Post from './screens/Post/Post';
import StorePost from './screens/StorePost/StorePost';
import PageNotFound from './screens/PageNotFound/PageNotFound';

// Prepare store
import reducers from './store/reducers';
import middlewares from './store/middlewares';

// Init Store
const store = createStore(reducers, middlewares);

class App extends Component {
  // @lifecycle
  componentWillMount() {
    // Get user
    let user = localStorage.getItem('user') || null;
    if (user !== null) {
      user = JSON.parse(user)
    } else {
      // Define initial user
      const defaultUser = {
        id: Math.random().toString(36).substr(-8),
        name: 'Udacity Student',
        login: 'udacityStudent',
        template: 'cerulean'
      }

      // Save user on local Storage
      localStorage.setItem('user', JSON.stringify(defaultUser))
    }

    const head = document.getElementsByTagName('head')[0];
    let link = document.createElement('link');
    link.id = 'theme';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = `./themes/bootstrap.${user.template}.min.css`;
    head.appendChild(link);
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route path='/' exact={true} component={Home} />
            <Route path="/page-not-found" component={PageNotFound} />
            <Route path="/new-post" component={StorePost} />
            <Route path="/:categoryName" exact={true} component={Category} />
            <Route path="/:categoryName/:postId" exact={true} component={Post} />
            <Route path="/:categoryName/:postId/edit" exact={true} component={StorePost} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
