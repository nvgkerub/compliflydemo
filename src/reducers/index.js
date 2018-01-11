import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ProfileReducer from './ProfileReducer';
import LibraryReducer from './LibraryReducer';
import Nav from './Nav';

export default combineReducers({
  session: AuthReducer,
  profile: ProfileReducer,
  library: LibraryReducer,
  nav: Nav,
});

// export { default as session } from './AuthReducer';
