import styles from '../styles/NoteboardLink.module.scss';
import Link from 'next/link';
import IconButton from './IconButton';
import { useFirestoreContext } from '../contexts/firestoreContext';
import RoundButton from './RoundButton';
import Modal from './Modal';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';

const NoteboardLink = ({noteboard, isActive}) => {

  const firestoreCtx = useFirestoreContext();
  
  const [confirmModal, setConfirmModal] = useState(false);

  const deleteHandler = () => {
    firestoreCtx.deleteNoteboard(noteboard.id);
  }
  
  const getLinkClasses = () => {
    const activeClass = isActive ? styles.active : ""; 
    return styles.noteboard + " " + activeClass;
  }

  return (
    <div className={styles.noteboardContainer}>
      <Modal
        isOpen={confirmModal}
        setIsOpen={setConfirmModal}
      >
        <ConfirmModal 
          cancelFuntion={() => setConfirmModal(false)}
          cancelText="Cancel"
          confirmFuntion={deleteHandler}
          confirmText="Delete"
        >
          <span>
            Do you want to delete noteboard <b>{noteboard.data.name}</b>?
          </span>
        </ConfirmModal>
      </Modal>
      <Link href={`/noteboards/${encodeURIComponent(noteboard.id)}`}>
        <div 
        className={getLinkClasses()}
        >
          {noteboard.data.name}
        </div>
      </Link>
      {
        isActive && 
        <RoundButton 
        iconName="majesticons:trash-line"
        onClick={() => {setConfirmModal(true)}}
        isAlternate={true}
        />
      }
    </div>
  )
}

export default NoteboardLink
