import {createAction} from 'redux-actions';

const login = createAction('LOGIN', ({token, username, email}) => ({token, username, email}));

export {login};