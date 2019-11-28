import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export function HeaderBar(props) {
  const classes = useStyles();

  console.log(props, " +++++++++ ")

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <AddIcon />
          </IconButton> */}
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