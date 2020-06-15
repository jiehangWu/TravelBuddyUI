import React, { Component } from "react";
// import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import GoogleMapReact from 'google-map-react';

import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  background-color: red;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
`;

// const Marker = (props) => {
//   return (
//     <Wrapper
//       alt={props.text}
//       {...props.onClick ? { onClick: props.onClick } : {}}
//     >{props.text}
//     </Wrapper>
//   );
// };

const Marker = ({lat, lng, text}) => {
  return (
    <Wrapper alt={text}>
      {text}
    </Wrapper>
  );
};

// Marker.defaultProps = {
//   onClick: null,
// };

// Marker.propTypes = {
//   onClick: PropTypes.func,
//   text: PropTypes.string.isRequired,
// };

class Gmap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: []
    };
    // this.fetchAllGeolocations = this.fetchAllGeolocations.bind(this);
  }
  static defaultProps = {
    center: { lat: 49.2827, lng: -123.1207 },
    zoom: 10
  };

  // fetchAllGeolocations() {
  //   async function getAllLocations() {
  //     let response = await fetch("http://localhost:8080/locations");
  //     let json = await response.json();
  //     return json;
  //   }

  //   return getAllLocations();
  // }

  componentDidMount() {
    axios.get("http://localhost:8080/locations")
      .then(res => {
        const markers = res.data.map(obj => {
          return {
            lat: obj["latitude"],
            lng: obj["longitude"]
          };
        });

        this.setState({
          markers
        })
      });
  }

  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GMAP_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {/* <Marker
            lat={49.2827}
            lng={-123.1307}
            text="My Marker"
          /> */}
          {this.state.markers.map((marker) => {
            let lat = marker.lat;
            let lng = marker.lng;
            console.log({ lat, lng });
            return (
              <Marker
                lat={lat}
                lng={lng}
                text="marker"
              />
              // <div>
              //   {lat},
              //   {lng}
              // </div>
            );
          })}
        </GoogleMapReact>
      </div>
    )
  }
}


export default Gmap;