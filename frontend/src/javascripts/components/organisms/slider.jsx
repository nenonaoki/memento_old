// @flow
import React, { Component } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router';

type Props = {};

class CustomSlider extends Component {
  props: Props;

  render() {
    const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      centerMode: true,
      draggable: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: { slidesToShow: 4 },
        },
        {
          breakpoint: 992,
          settings: { slidesToShow: 3 },
        },
        {
          breakpoint: 768,
          settings: { slidesToShow: 2 },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            centerMode: false,
          },
        },
      ],
    };

    return (
      <Slider {...settings}>
        <div className="p-w-xs">
          <Link to="#">
            <img src="/images/home/pickup.jpg" className="img-responsive" alt="" />
          </Link>
        </div>
        <div className="p-w-xs">
          <Link to="#">
            <img src="/images/home/pickup.jpg" className="img-responsive" alt="" />
          </Link>
        </div>
        <div className="p-w-xs">
          <Link to="#">
            <img src="/images/home/pickup.jpg" className="img-responsive" alt="" />
          </Link>
        </div>
        <div className="p-w-xs">
          <Link to="#">
            <img src="/images/home/pickup.jpg" className="img-responsive" alt="" />
          </Link>
        </div>
        <div className="p-w-xs">
          <Link to="#">
            <img src="/images/home/pickup.jpg" className="img-responsive" alt="" />
          </Link>
        </div>
        <div className="p-w-xs">
          <Link to="#">
            <img src="/images/home/pickup.jpg" className="img-responsive" alt="" />
          </Link>
        </div>
      </Slider>
    );
  }
}

export default CustomSlider;
