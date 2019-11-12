import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";

import { withStyles, AppBar, Toolbar } from "@material-ui/core";

const styles = {
  root: {
    position: "static",
    background: "transparent !important",
    width: "100%",
    alignItems: "center"
  }
};

class Header extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <AppBar classes={{ root: classes.root }}>
          <Toolbar color="inherit">
            <MenuItem
              component={Link}
              to={"/HomePage"}
              classes={{ root: classes.link }}
            >
              Home
            </MenuItem>
            <MenuItem component={Link} to={"/FavoritesPage"}>
              Favorites
            </MenuItem>
          </Toolbar>
        </AppBar>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Header);
