import { Icon } from '@iconify/react';
import styles from '../styles/RoundButton.module.scss';

const RoundButton = ({iconName, onClick, isAlternate}) => {

  const classList = [styles.RoundButton];
  if(isAlternate) classList.push(styles.alternate);

  return (
    <button onClick={onClick} className={classList.join(' ')}>
      <Icon className={styles.icon} icon={iconName} />
    </button>
  )
}

export default RoundButton
