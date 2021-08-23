import styles from '../styles/NoteboardLink.module.scss';
import Link from 'next/link';
import IconButton from './IconButton';
import { useFirestoreContext } from '../contexts/firestoreContext';
import RoundButton from './RoundButton';

const NoteboardLink = ({noteboard, isActive}) => {

  const firestoreCtx = useFirestoreContext();

  const classList = [styles.noteboard];
  if(isActive) classList.push(styles.active);

  const deleteHandler = () => {
    firestoreCtx.deleteNoteboard(noteboard.id);
  }
  
  return (
    <div className={styles.noteboardContainer}>
        <Link href={`/noteboards/${encodeURIComponent(noteboard.id)}`}>
          <div 
          className={classList.join(' ')}
          >
            {noteboard.data.name}
          </div>
        </Link>
        {
          isActive && 
          <RoundButton 
          iconName="majesticons:trash-line"
          onClick={deleteHandler}
          />
          
          /* <IconButton 
          onClick={deleteHandler}
          style={{
            width: "2rem",
            height: "2rem"
          }} 
          isDark={true} 
          iconName="majesticons:trash-line"
          /> */
        }
      </div>
  )
}

export default NoteboardLink
