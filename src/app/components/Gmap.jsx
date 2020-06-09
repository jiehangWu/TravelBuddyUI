import React, { Component } from "react";
import GoogleMapReact from 'google-map-react';

import PropTypes from 'prop-types';
import styled from 'styled-components';

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

const Marker = props => (
  <Wrapper
    alt={props.text}
    {...props.onClick ? { onClick: props.onClick } : {}}
  >{props.text}</Wrapper>
);

Marker.defaultProps = {
  onClick: null,
};

Marker.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
};

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Gmap extends Component {
    static defaultProps = {
        center: {lat: 49.2827, lng: -123.1207},
        zoom: 10
    };

    render() {
        console.log(process.env)
        return (
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GMAP_KEY }}
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
                >
                    <Marker
                        lat={49.2527}
                        lng={-123.1207}
                        text="My Marker"
                        onClick={()=>console.log('Clicked on (49.2527, -123.1207)')}
                    />
                    <Marker
                        lat={49.2827}
                        lng={-123.1307}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        )
    }
}

export default Gmap;
