function getLatLon(address, opt_return_type) {
  try {
    var location = Maps.newGeocoder().geocode(address);
    var lat_lon = location["results"][0]["geometry"]["location"];
    if (opt_return_type == null) {
      return lat_lon;
    }
    switch(opt_return_type){
    case "lat":
      return lat_lon["lat"];
      break;
    case "lon":
      return lat_lon["lng"];
      break;
    default:
      return "Wrong Unit Type";
    }
  } catch (f) {
    Logger.log(f.toString());
    return false;
  }
}