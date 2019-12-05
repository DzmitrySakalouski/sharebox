import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    backgroundColor: 'white',
    padding: 4
  },
  title: {
    flexGrow: 1,
  },
  loader: { 
    backgroundColor: 'white', 
    position: 'fixed', 
    top: 0, 
    left: 0, 
    height: "100vh", 
    width: '100vw', 
    display: 'flex', 
    justifyContent: "center", 
    alignItems: "center",
    zIndex: 5000
  }
}));

function HeaderBarComponent(props) {
  const classes = useStyles();

  const renderLoader = () => {
    return (
      <div className={classes.loader}>
        <Loader type="ThreeDots" color="#somecolor" height={80} width={80} />
      </div>
    );    
  }

  if (props.isLoading) {
    return renderLoader();
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography className={classes.title} variant="h6" color="inherit">
            Second World Sharebox
          </Typography>
          <Avatar src={props.user.photoURL} />
          <Button onClick={props.onLogOut} color="inherit">Log Out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => ({ isLoading: state.loader.isLoading });

export const HeaderBar = connect(mapStateToProps)(HeaderBarComponent);