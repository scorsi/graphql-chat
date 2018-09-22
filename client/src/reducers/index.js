import {handleActions} from 'redux-actions';

const reducer = handleActions(
  {
    'LOGIN': (state, {payload}) => {
      return {...state, ...payload};
    }
  },
  {}
);

export default reducer;