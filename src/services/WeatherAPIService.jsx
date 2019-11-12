import http from "./HttpService";

export function getCities(userDesiredCity) {
  const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?q=${userDesiredCity}&apikey=Sc9oV2iCgq625TheH184PZuXwkf6b7nW&q=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F76.0.3809.100%20Safari%2F537.36&language=en-us HTTP/1.1`;
  return http.get(url);
}

export async function getCurrentCityWeather(cityUniqueKey) {
  const cityUrl = `http://dataservice.accuweather.com/currentconditions/v1/${cityUniqueKey}?apikey=Sc9oV2iCgq625TheH184PZuXwkf6b7nW&language=en-us`;
  return http.get(cityUrl);
}

export function getForecast(cityUniqueKey) {
  let ForecastUrl = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityUniqueKey}?apikey=Sc9oV2iCgq625TheH184PZuXwkf6b7nW&language=en-us&metric=true`;
  return http.get(ForecastUrl);
}
