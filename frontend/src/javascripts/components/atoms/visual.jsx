// @flow
import React from 'react';
import _isEmpty from 'lodash/isEmpty';
import classnames from 'classnames';

type Props = {
  src: string,
  className: string,
};

const Visual = (props: Props) => {
  const imageClassNames = classnames({
    [props.className]: true,
  });

  let imageSrc = 'https://s3-ap-northeast-1.amazonaws.com/dev.memento.com/medium/default/visual.png';

  if (!_isEmpty(props.src)) {
    imageSrc = props.src;
  }

  return (<img src={imageSrc} className={imageClassNames} alt="" />);
};

export default Visual;
