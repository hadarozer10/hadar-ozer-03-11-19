import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  MenuItem,
  Typography,
  withStyles
} from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import Header from "../layouts/Header";
import Styles from "./FavoritesPageStyles";

class FavoritesPage extends Component {
  getFavorite = (name, id) => {
    this.props.getCity(name, id);
  };

  render() {
    const { classes, favoriteCities, getUpdateCurrentCity } = this.props;
    if (favoriteCities.length !== 0) {
      return (
        <div className={classes.root}>
          <Header />
          {favoriteCities.map(city => (
            <Card classes={{ root: classes.Card }} key={city.id}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5">
                    {city.city}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {city.id}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Typography variant="body2" color="textSecondary">
                  {city.weather[0].Temperature.Metric.Value +
                    String.fromCharCode(8451)}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {city.weather[0].WeatherText}
                </Typography>
                <MenuItem
                  onClick={() => getUpdateCurrentCity(city)}
                  component={Link}
                  to={"/HomePage"}
                >
                  <InfoIcon fontSize="small" />
                </MenuItem>
              </CardActions>
            </Card>
          ))}
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <Header />
          <div className={classes.noFavorites}>
            <Typography variant="h5">
              You Didnt Mark Any City To Favore
            </Typography>
          </div>
        </div>
      );
    }
  }
}

export default withStyles(Styles)(FavoritesPage);
