import React from 'react'
import s from '../styles/ConfirmModal.module.scss';

const ConfirmModal = ({
  children,
  cancelFuntion,
  cancelText,
  confirmFuntion,
  confirmText
  }) => {
  return (
    <div className={s.ConfirmModal}>
      <div className={s.question}>
        {children}
      </div>
      <div className={s.buttonsPanel}>
        <button className="button" onClick={cancelFuntion}>{cancelText}</button>
        <button className="button danger" onClick={confirmFuntion} >{confirmText}</button>
      </div>
    </div>
  )
}

export default ConfirmModal
