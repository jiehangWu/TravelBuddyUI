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

const CenterWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 22px;
  height: 22px;
  background-color: green;
  border: 2px solid #fff;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: ${props => (props.onClick ? 'pointer' : 'default')};
  &:hover {
    z-index: 1;
  }
`;

const Marker = (props) => {
  return (
    <Wrapper
      alt={props.text}
      {...props.onClick ? { onClick: props.onClick } : {}}
    >{props.text}
    </Wrapper>
  );
};

const Center = (props) => {
  return (
    <CenterWrapper
      alt={props.text}
      {...props.onClick ? { onClick: props.onClick } : {}}
    >{props.text}
    </CenterWrapper>
  );
};

// const Marker = ({lat, lng, text, onClick}) => {
//   return (
//     <Wrapper alt={text}>
//       {text}
//     </Wrapper>
//   );
// };

Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

class Gmap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: { lat: 49.2827, lng: -123.1207 },
      markers: []
    };
    // this.fetchAllGeolocations = this.fetchAllGeolocations.bind(this);
  }
  static defaultProps = {
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

  searchDestination(x, y) {
    // TODO: Validation
    this.setState({
        center: {
          lat: parseFloat(x),
          lng: parseFloat(y),
        }, 
      });
  }


  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <button onClick={() => {
            const buf_lat = document.getElementById("input_lat").value
            const buf_lng = document.getElementById("input_lng").value
            console.log("inputting lat: " + buf_lat + ", lng: " + buf_lng)
            this.searchDestination(buf_lat, buf_lng)
          }}
        >Search location</button>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GMAP_KEY }}
          defaultCenter={this.state.center}
          center={this.state.center}
          defaultZoom={this.props.zoom}
        >
          <Center
            lat={this.state.center.lat}
            lng={this.state.center.lng}
            text="Destination"
            onClick ={() => console.log("Destination was Clicked")}
          />
          <Marker
            lat={49.2527}
            lng={-123.1397}
            text="My Marker"
            onClick ={() => console.log("Clicked")}
          />
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