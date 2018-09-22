import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router'
import {Mutation} from 'react-apollo';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import Input from '../forms/Input';
import {login} from '../../actions';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

const SIGN_IN_MUTATION = gql`
  mutation AuthenticateMutation($username: String!, $password: String!) {
    authenticate(
      username: $username,
      password: $password
    ) {
      token
      username
      email
    }
  }
`;

class Login extends React.Component {
  state = {
    username: '',
    password: ''
  };

  _confirm = data => {
    const {token, username, email} = data.authenticate;
    this.props.dispatch(login({token, username, email}));
    this.props.history.push('/');
  };

  _usernameOnChange = data => {
    this.setState({username: data})
  };

  _passwordOnChange = data => {
    this.setState({password: data})
  };

  render() {
    const {classes} = this.props;
    const {username, password} = this.state;
    return (
      <React.Fragment>
        <CssBaseline/>
        <div className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon/>
            </Avatar>
            <Typography variant="headline">Sign in</Typography>
            <Mutation
              mutation={SIGN_IN_MUTATION}
              variables={{username, password}}
              onCompleted={this._confirm}
            >
              {mutation => (
                <form className={classes.form}>
                  <Input name='username' type="text" value={username} onChange={this._usernameOnChange}/>
                  <Input name='password' type="password" value={password} onChange={this._passwordOnChange}/>
                  <Button
                    fullWidth
                    type="submit"
                    variant="raised"
                    color="primary"
                    className={classes.submit}
                    onClick={e => {
                      e.preventDefault();
                      mutation();
                    }}
                  >
                    Sign in
                  </Button>
                </form>
              )}
            </Mutation>
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

Login.propTypes = {
// eslint-disable-next-line react/forbid-prop-types
  classes: PropTypes.object.isRequired,
// eslint-disable-next-line react/forbid-prop-types
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(withRouter(withStyles(styles)(Login)));
