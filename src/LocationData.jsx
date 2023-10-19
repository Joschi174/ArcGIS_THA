const LocationData = (props) => {
    return (
        <div className="location">
            <h1>Location</h1>
            <p>Latitude: {props.lat}</p>
            <p>Longitude: {props.lon}</p>
        </div>
      );
}
 
export default LocationData;