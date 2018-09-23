import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const styles = () => ({
  root: {
    flexGrow: 1,
  }
});

class Chat extends React.Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={9}>
            totot
          </Grid>
          <Grid item xs={3}>
            tejei
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(Chat);