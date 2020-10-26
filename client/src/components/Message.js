import React from 'react';

export const Message = ({msg, msgType}) => {
  const getIcon = (msgType) => {
    switch (msgType) {
      case 'success':
        return 'fas fa-check-circle';
      case 'warning':
      case 'danger':
        return 'fas fa-exclamation-circle';
      case 'info':
        return 'fas fa-info-circle';
      default:
        break;
    }
  }
  return (
    <div className={`alert alert-${msgType} alert-dismissible fade show`} role="alert">
      <strong><i className={`${getIcon(msgType)}`}></i></strong> &nbsp;{msg}
      <button type="button" className="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  )
}