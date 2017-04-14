// @flow
import React, { Component } from 'react';

type Props = {
  token: string,
};

class Movie extends Component {
  props: Props;

  componentDidMount() {
    embedpano({
      swf: '/krpano/krpano.swf',
      xml: `/api/media/${this.props.token}/viewer`,
      target: 'pano',
      html5: 'auto',
      mobilescale: 1.0,
      passQueryParameters: false,
    });
  }

  render() {
    return (
      <div id="playerContainer">
        <div id="pano"></div>
      </div>
    );
  }
}

export default Movie;
