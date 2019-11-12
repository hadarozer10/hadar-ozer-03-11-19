import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuList from "@material-ui/core/MenuList";
import { InputBase, withStyles } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { fade } from "@material-ui/core/styles";

const Styles = theme => ({
  root: {
    display: "flex"
  },
  search: {
    position: "relative",
    borderRadius: "16rem",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    [theme.breakpoints.up("sm")]: {
      marginLeft: "35%",
      width: "30%"
    }
  },
  searchIcon: {
    height: "100%",
    position: "absolute",
    pointerEvents: "none"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  Paper: {
    position: "absolute",
    borderRadius: "1rem",
    width: "165px",
    alignItems: "center",
    textAlign: "center"
  }
});

const SearchField = props => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = event => {
    setOpen(true);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  function renderCities(event, name, id) {
    props.getCity(name, id);
    handleClose(event);
  }

  return (
    <div className={props.classes.search}>
      <SearchIcon className={props.classes.searchIcon} />
      <InputBase
        placeholder="Search for a city…"
        classes={{
          root: props.classes.inputRoot,
          input: props.classes.inputInput
        }}
        ref={anchorRef}
        value={props.searchedCity}
        onChange={event => {
          props.getChange(event);
          handleToggle(event);
        }}
      />
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom"
            }}
          >
            <Paper className={props.classes.Paper}>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {props.cities.length > 0
                    ? props.cities.map((city, event) => (
                        <MenuItem
                          key={city.Key}
                          onClick={() => {
                            renderCities(event, city.LocalizedName, city.Key);
                          }}
                        >
                          <ListItemText primary={city.LocalizedName} />
                        </MenuItem>
                      ))
                    : null}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default withStyles(Styles)(SearchField);
