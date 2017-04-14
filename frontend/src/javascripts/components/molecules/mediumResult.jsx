// @flow
import React from 'react';
import { Link } from 'react-router';

import Visual from '../atoms/visual';

type Props = {
  token: string,
  title: string,
  description: string,
  image: {
    url: string,
  }
};

const MediumResult = (props: Props) => {
  const {
    token,
    title,
    description,
    image,
  } = props;

  return (
    <div>
      <Link to={`/media/${token}`} className="search-link">
        <div className="search-result">
          <div className="media">
            <div className="media-left">
              <Visual
                src={image.url}
                className="media-object img-visual"
              />
            </div>
            <div className="media-body">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </Link>
      <div className="hr-line-dashed"></div>
    </div>
  );
};

export default MediumResult;
