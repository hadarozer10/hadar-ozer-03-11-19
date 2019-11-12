import React, { Component, Fragment } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import HomePage from "./components/HomePage";
import FavoritesPage from "./components/FavoritesPage";
import NotFound from "./NotFound/NotFound";
import { toast } from "react-toastify";

import {
  getCities,
  getCurrentCityWeather,
  getForecast
} from "./services/WeatherAPIService";

class App extends Component {
  constructor(props) {
    super(props);
    this.handleCity("Tel Aviv", "215854");
  }
  state = {
    cities: [],
    searchedCity: "",
    favoriteCities: [],
    currentCity: { weather: [] },
    futureForecastCitytWeather: { DailyForecasts: [] },
    errors: {}
  };

  handleUpdateCurrentCity = city => {
    this.setState({ currentCity: city });
  };

  handleCity = async (LocalizedName, Key) => {
    try {
      let { currentCity, searchedCity } = this.state;
      searchedCity = "";
      const { data: currentCityWeather } = await getCurrentCityWeather(Key);
      const { data: futureForecastCitytWeather } = await getForecast(Key);

      this.setState({ searchedCity });
      currentCity = {
        city: LocalizedName,
        id: Key,
        weather: currentCityWeather,
        isLiked: this.handleLike()
      };

      this.setState({
        searchedCity,
        currentCity,
        futureForecastCitytWeather
      });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.error = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  handleUnitType = unitType => {
    if (unitType === 17) {
      return String.fromCharCode(8451);
    } else if (unitType === 18) {
      return String.fromCharCode(8457);
    }
  };

  handleLike = () => {
    const { favoriteCities, currentCity } = this.state;
    favoriteCities.forEach(City => {
      if (City === currentCity) {
        return true;
      }
    });
    return false;
  };

  handleChange = async ({ target }) => {
    try {
      // this.preventDefault();
      const searchedCity = target.value;
      this.setState({
        searchedCity
      });

      if (
        target.value[target.value.length - 1] < 65 ||
        target.value[target.value.length - 1] > 90 ||
        target.value[target.value.length - 1] < 97 ||
        target.value[target.value.length - 1] > 122
      ) {
        toast("please type in english words only");
      }

      const { data: cities } = await getCities(searchedCity);
      this.setState({ searchedCity, cities });
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.error = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  handleFavorties = () => {
    const { currentCity, favoriteCities } = this.state;
    const newFavor = [...favoriteCities];
    let check = false,
      index = -1;

    favoriteCities.forEach(City => {
      if (City === currentCity) {
        currentCity.isLiked = false;
        check = true;
      }
    });
    if (check === false) {
      currentCity.isLiked = true;
      newFavor.push(currentCity);
    } else {
      index = newFavor.indexOf(currentCity);
      newFavor.splice(index, 1);
    }
    this.setState({ favoriteCities: newFavor });
  };

  render() {
    return (
      <Fragment>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <HomePage
                getUnitType={this.handleUnitType}
                getLike={this.handleLike}
                getCity={this.handleCity}
                getChange={this.handleChange}
                getFavorites={this.handleFavorties}
                cities={this.state.cities}
                searchedCity={this.state.searchedCity}
                favoriteCities={this.state.favoriteCities}
                currentCity={this.state.currentCity}
                futureForecastCitytWeather={
                  this.state.futureForecastCitytWeather
                }
                errors={this.state.errors}
                {...props}
              />
            )}
          />
          <Route exact path="/HomePage">
            <Redirect to="/" />
          </Route>
          <Route
            exact
            path="/FavoritesPage"
            render={props => (
              <FavoritesPage
                getUpdateCurrentCity={this.handleUpdateCurrentCity}
                getUnitType={this.handleUnitType}
                favoriteCities={this.state.favoriteCities}
                getCity={this.handleCity}
                {...props}
              />
            )}
          />
          <Route component={NotFound} />
          <Redirect to="/NotFound" />
        </Switch>
      </Fragment>
    );
  }
}

export default App;
