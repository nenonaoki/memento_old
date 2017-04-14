// @flow
import React from 'react';
import classnames from 'classnames';

type Props = {
  pageCount: number,
  pageCurrent: number,
  onClickButton: Function,
};

const Pager = (props: Props) => {
  const {
    pageCount,
    pageCurrent,
    onClickButton,
  } = props;

  return (
    <div className="text-center">
      <div className="btn-group">
        {Array.from(Array(pageCount), (value, index) => {
          const page = index + 1;
          return (
            <button
              key={index}
              onClick={() => onClickButton(page)}
              className={classnames({
                btn: true,
                'btn-white': true,
                active: page === pageCurrent,
              })}
            >{page}</button>
          );
        })}
      </div>
    </div>
  );
};

export default Pager;
