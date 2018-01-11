import { NavigationActions } from 'react-navigation';
import { RootStack } from '../Router';

const initialState = RootStack.router.getStateForAction(NavigationActions.init());

export default (state = initialState, action) => {
  const nextState = RootStack.router.getStateForAction(action, state);
  return nextState || state;
};
