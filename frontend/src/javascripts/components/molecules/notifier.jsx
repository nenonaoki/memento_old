// @flow
import React, { Component } from 'react';
import classnames from 'classnames';

type Props = {
  type: string,
  title: string,
  message: string,
  onClose: Function,
};

class Notifier extends Component {
  props: Props;

  componentWillMount() {
    if (this.props.type === 'success') {
      setTimeout(() => {
        this.props.onClose();
      }, 5000);
    }
  }

  render() {
    const props = this.props;

    const toastClassNames = classnames({
      animated: true,
      toast: true,
      'toast-success': props.type === 'success',
      'toast-error': props.type === 'error',
      'toast-warning': props.type === 'warning',
      'toast-info': props.type === 'info',
    });

    return (
      <div className={toastClassNames}>
        <button
          type="button"
          className="toast-close-button"
          onClick={props.onClose}
        >×</button>
        {props.title && <div className="toast-title">{props.title}</div>}
        <div className="toast-message">{props.message}</div>
      </div>
    );
  }
}

export default Notifier;
