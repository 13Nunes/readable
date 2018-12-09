// Basic
import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';

// Middleware Logger
import logger from './logger';

export default applyMiddleware(thunk, logger);