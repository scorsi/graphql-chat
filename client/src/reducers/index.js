import {handleActions} from 'redux-actions';

const reducer = handleActions(
  {
    'LOGIN': (state, {payload}) => {
      return {...state, ...payload};
    },
    'LOGOUT': (state) => {
      return {...state, token: undefined, email: undefined, username: undefined};
    }
  },
  {}
);

export default reducer;