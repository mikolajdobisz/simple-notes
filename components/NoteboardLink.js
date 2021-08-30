import styles from '../styles/NoteboardLink.module.scss';
import Link from 'next/link';
import { useFirestoreContext } from '../contexts/firestoreContext';

const NoteboardLink = ({noteboard, isActive}) => {

  const firestoreCtx = useFirestoreContext();
  
  const getLinkClasses = () => {
    const activeClass = isActive ? styles.active : ""; 
    return styles.noteboard + " " + activeClass;
  }

  return (
    <div className={styles.noteboardContainer}>
      <Link href={`/noteboards/${encodeURIComponent(noteboard.id)}`}>
        <div 
        className={getLinkClasses()}
        >
          {noteboard.data.name}
        </div>
      </Link>
    </div>
  )
}

export default NoteboardLink
