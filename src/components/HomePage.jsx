import React from "react";
import { Grid, withStyles } from "@material-ui/core";
import Styles from "./HomePageStyles";
import Header from "../layouts/Header";
import HomePageItems from "./HomePageItems";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchField from "../layouts/SearchField";

class HomePage extends HomePageItems {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Grid container className={classes.root}>
          <Grid item xs={12} className={classes.item}>
            <Header />
            <ToastContainer />
          </Grid>
          <Grid item xs={12} className={classes.item}>
            <SearchField
              currentCity={this.props.currentCity}
              getCity={this.props.getCity}
              cities={this.props.cities}
              getChange={this.props.getChange}
              searchedCity={this.props.searchedCity}
            />
          </Grid>
          <Grid item xs={12} className={classes.item}>
            {this.renderCurrentCity()}
          </Grid>
          <Grid item xs={12} className={classes.item}>
            {this.renderForecastDays()}
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(Styles)(HomePage);
