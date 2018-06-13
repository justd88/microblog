import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";

import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { Route, Link } from "react-router-dom";
import Home from "../home";
import Followers from "../followers";
import About from "../about";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  menuItem: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& $primary, & $icon": {
        color: theme.palette.common.white
      }
    }
  },
  primary: {},
  icon: {},
  appFrame: {
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`
  },
  "appBar-left": {
    marginLeft: drawerWidth
  },
  "appBar-right": {
    marginRight: drawerWidth
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  mainContent: {
    paddingTop: 75,
    paddingLeft: 10,
    width: `calc(100% - ${drawerWidth}px - 10px)`
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

class App extends React.Component {
  state = {
    anchor: "left"
  };

  handleChange = event => {
    this.setState({
      anchor: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { anchor } = this.state;

    const drawer = (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor={anchor}
      >
        <div className={classes.toolbar} />
        <Divider />
        <MenuList>
          <MenuItem className={classes.menuItem} component={Link} to="/">
            <ListItemText
              classes={{ primary: classes.primary }}
              inset
              primary="Timeline"
            />
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            component={Link}
            to="/followers"
          >
            <ListItemText
              classes={{ primary: classes.primary }}
              inset
              primary="Followers"
            />
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            component={Link}
            to="/following"
          >
            <ListItemText
              classes={{ primary: classes.primary }}
              inset
              primary="Following"
            />
          </MenuItem>
          <MenuItem
            className={classes.menuItem}
            component={Link}
            to="/allusers"
          >
            <ListItemText
              classes={{ primary: classes.primary }}
              inset
              primary="All Users"
            />
          </MenuItem>
        </MenuList>
      </Drawer>
    );

    let before = null;
    let after = null;

    if (anchor === "left") {
      before = drawer;
    } else {
      after = drawer;
    }

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, classes[`appBar-${anchor}`])}
          >
            <Toolbar>
              <Typography variant="title" color="inherit" noWrap>
                MiniBlog
              </Typography>
            </Toolbar>
          </AppBar>
          {before}
          <main className={classes.mainContent}>
            <Route exact path="/" component={Home} />
            <Route exact path="/followers" component={Followers} />
          </main>
          {after}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
