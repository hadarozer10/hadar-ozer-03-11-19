import React, { Component } from "react";
import { Typography, Grid } from "@material-ui/core";
import LikeIcon from "../layouts/LikeIcon";
import Moment from "react-moment";
import Container from "@material-ui/core/Container";

class HomePageItems extends Component {
  renderCurrentCity() {
    const { classes, currentCity, getFavorites } = this.props;
    return (
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        width="auto"
        className={classes.middleSection}
      >
        <Grid item xs={12}>
          <LikeIcon liked={currentCity.isLiked} onClick={getFavorites} />
        </Grid>
        <Grid item xs={12} className={classes.item}>
          <Typography gutterBottom variant="h1">
            {currentCity.city}
          </Typography>
        </Grid>

        <Grid item xs={12} className={classes.item}>
          <Typography gutterBottom variant="h4">
            {currentCity.weather.map(
              weather =>
                weather.Temperature.Metric.Value + String.fromCharCode(8451)
            )}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.item}>
          <Typography gutterBottom variant="h4">
            {currentCity.weather.map(weather => weather.WeatherText)}
          </Typography>
        </Grid>
      </Grid>
    );
  }

  renderForecastDays() {
    const { futureForecastCitytWeather } = this.props;
    const Forecast = futureForecastCitytWeather.DailyForecasts;
    return (
      <div
        style={{
          display: "inline-block"
        }}
      >
        {Forecast.map(day => (
          <Container
            maxWidth="xs"
            key={day.Date}
            style={{
              borderRadius: "20rem",
              margin: "2px",
              backgroundColor: "#cfe8fc",
              height: "auto",
              width: "30vh",
              padding: "20px"
            }}
          >
            <Typography
              component="div"
              style={{
                backgroundColor: "#cfe8fc",

                textAlign: "center"
              }}
            >
              <Moment format={"dddd"}>{day.Date}</Moment>
            </Typography>
            <Typography
              component="div"
              style={{
                backgroundColor: "#cfe8fc",
                textAlign: "center"
              }}
            >
              {Math.round(
                (day.Temperature.Maximum.Value +
                  day.Temperature.Minimum.Value) /
                  2
              ) + String.fromCharCode(8451)}
            </Typography>
          </Container>
        ))}
      </div>
    );
  }
}

export default HomePageItems;
