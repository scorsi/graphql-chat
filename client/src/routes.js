import SignIn from './components/auth/Login';
import Register from './components/auth/Register';
import Chat from './components/Chat';

export default [
  {
    path: '/',
    private: true,
    exact: true,
    component: Chat
  },
  {
    path: '/login',
    exact: true,
    component: SignIn
  },
  {
    path: '/register',
    exact: true,
    component: Register
  }
];
