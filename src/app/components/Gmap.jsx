import React, { Component } from "react";
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

const CovidCase = (props) => {
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

CovidCase.defaultProps = {
  onClick: null,
};

CovidCase.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

class Gmap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: { lat: 49.2827, lng: -123.1207 },
      range: 1,
      markers: []
    };
    // this.fetchAllGeolocations = this.fetchAllGeolocations.bind(this);
  }
  static defaultProps = {
    zoom: 10
  };

  searchDestination(x, y, r) {
    // TODO: Validation
    this.setState({
        center: {
          lat: parseFloat(x),
          lng: parseFloat(y),
        },
        range: parseFloat(r)
      });
    
    axios.get(`http://localhost:8080/covidcaserangelist/${this.state.center.lat}/${this.state.center.lng}/${this.state.range}`)
    .then(res => {
      const markers = res.data.map(obj => {
        return {
          lat: obj["latitude"],
          lng: obj["longitude"],
          type: obj["caseType"],
          count: obj["count"]
        };
      });

      this.setState({
        markers
      })
    });

    this.props.setAppDestination({
      lat: parseFloat(x),
      lng: parseFloat(y),
    });
  }


  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <button onClick={() => {
            const buf_lat = document.getElementById("input_lat").value
            const buf_lng = document.getElementById("input_lng").value
            const r = document.getElementById("input_range").value
            console.log("inputting lat: " + buf_lat + ", lng: " + buf_lng, ", range: " + r)
            this.searchDestination(buf_lat, buf_lng, r)
          }}
        >Search location</button>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GMAP_KEY }}
          defaultCenter={this.state.center}
          center={this.state.center}
          defaultZoom={this.props.zoom}
        >
          {this.state.markers.map((marker) => {
            let lat = marker.lat;
            let lng = marker.lng;
            console.log({ lat, lng } + `${parseInt(marker.count) * 5}px`);
            return (
              <CovidCase
                lat={lat}
                lng={lng}
                text={marker.count}
                style={{ height: `${parseInt(marker.count) * 5}px`, width: `${parseInt(marker.count) * 5}px`}}
                onClick ={() => console.log("Clicked")}
              />
            );
          })}
          <Center
            lat={this.state.center.lat}
            lng={this.state.center.lng}
            text="Destination"
            onClick ={() => console.log("Destination was Clicked")}
          />
        </GoogleMapReact>
      </div>
    )
  }
}


export default Gmap;