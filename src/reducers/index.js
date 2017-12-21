import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';

export default combineReducers({
  session: AuthReducer,
  profile: ProfileReducer,
});

// export { default as session } from './AuthReducer';
