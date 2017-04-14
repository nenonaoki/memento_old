// @flow
import React from 'react';
import { Link } from 'react-router';

type Props = {
  children: string,
  slug: string,
};

const Tag = (props: Props) => (
  <Link to={`/tags/${props.slug}`}>
    <i className="fa fa-tag"></i> {props.children}
  </Link>
);

export default Tag;
