import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCLu6EBD1cEdhhYluZok4lTLbig-2YIrc0&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {};

      this.setState({
        position: null,
        onMarkerMounted: (ref) => {
          refs.marker = ref;
        },

        onPositionChanged: () => {
          const position = refs.marker.getPosition();
          //          console.log(position.toString());
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap defaultZoom={15} defaultCenter={props.initialPosition}>
    {props.isMarkerShown && (
      <Marker
        position={props.initialPosition}
        draggable={true}
        ref={props.onMarkerMounted}
        onPositionChanged={props.onPositionChanged}
      />
    )}
  </GoogleMap>
));

class MyParentComponentWrapper extends React.PureComponent {
  state = {
    isMarkerShown: false,
  };

  render() {
    return (
      <div>
        <MyMapComponent
          isMarkerShown={true}
          initialPosition={this.props.position}
        />
      </div>
    );
  }
}

export default MyParentComponentWrapper;
