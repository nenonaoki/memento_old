// @flow
import React from 'react';
import _isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';

type Props = {
  src: string,
  className: string,
};

const Cover = (props: Props) => {
  const imageClassNames = classnames({
    [props.className]: true,
  });

  let imageSrc = 'http://placehold.it/820x312';

  if (!_isEmpty(props.src)) {
    imageSrc = props.src;
  }

  return (<img src={imageSrc} className={imageClassNames} alt="" />);
};

export default Cover;
