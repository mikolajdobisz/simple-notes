import s from '../styles/Modal.module.scss';

const Modal = ({ isOpen, setIsOpen ,children }) => {
  return (
  <>
    {
    isOpen &&
    <div className={s.Modal}>
      <div onClick={() => {setIsOpen(!open)}} className={s.ModalBackground}></div>
      <div className={s.ModalContent}>{children}</div>
    </div>
    }
  </>
  );
};

export default Modal;
