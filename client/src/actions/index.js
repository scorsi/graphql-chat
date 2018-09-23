import {createAction} from 'redux-actions';

const login = createAction('LOGIN', ({token, username, email}) => ({token, username, email}));
const logout = createAction('LOGOUT');

export {login, logout};