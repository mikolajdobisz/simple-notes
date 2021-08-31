import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import { useFirestoreContext } from '../contexts/firestoreContext';
import styles from '../styles/NoteboardControls.module.scss';
import ConfirmModal from './ConfirmModal';
import Modal from './Modal';
import RoundButton from './RoundButton';

const NoteboardControls = ({noteboard}) => {
  const firestoreCtx = useFirestoreContext();

  const router = useRouter();

  const [confirmModal, setConfirmModal] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [editionModal, setEditionModal] = useState(false);

  const closeEditionModal = () => {
    setEditionModal(false);
    setNameValue(noteboard.data.name);
  }

  const deleteHandler = () => {
    firestoreCtx.deleteNoteboard(noteboard.id);
    setConfirmModal(false);
    router.push("/noteboards");
  }

  const updateHandler = e => {
    console.log("XDDDD");
    e.preventDefault();
    firestoreCtx.updateNoteboard(noteboard.id, nameValue);
    setEditionModal(false);
  }

  useEffect(() => {
    if(noteboard){
      setNameValue(noteboard.data.name);
    }
  }, [noteboard])

  return (
    <>
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
            Do you want to delete noteboard <b>{noteboard && noteboard.data.name}</b>?
          </span>
        </ConfirmModal>
      </Modal>
      

      <Modal
      isOpen={editionModal}
      setIsOpen={closeEditionModal}
      >
        <div className={styles.editionModalContainer}>
          <form onSubmit={updateHandler}>
            <div className={styles.editionModal}>
              <div className={styles.editionModalHeadline}>Pick new name for noteboard <b>{noteboard && noteboard.data.name}</b></div>
              <input 
                value={nameValue} 
                onInput={e => {setNameValue(e.target.value)}}
                type="text" 
                placeholder="Name"
              />
              <div className={styles.editionModalButtons}>
                <button type="button" onClick={closeEditionModal} className="button alternate">Cancel</button>
                <button type="submit" className="button primary">Confirm</button>
              </div>
            </div>
          </form>
        </div>
      </Modal>



      <div className={styles.NoteboardControls}>
        <RoundButton 
        iconName="majesticons:trash-line"
        onClick={() => {setConfirmModal(true)}}
        isAlternate={true}
        isDisabled={noteboard === null}
        title="Delete selected noteboard"
        />
        <RoundButton 
        iconName="majesticons:pencil-line"
        onClick={() => {setEditionModal(true)}}
        isAlternate={true}
        isDisabled={noteboard === null}
        title="Edit selected noteboard"
        />
      </div>
    </>
  )
}

export default NoteboardControls
