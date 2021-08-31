import { Icon } from '@iconify/react';
import styles from '../styles/RoundButton.module.scss';

const RoundButton = ({iconName, onClick, isAlternate, isDisabled, title}) => {

  const classList = [styles.RoundButton];
  if(isAlternate) classList.push(styles.alternate);

  return (
    <button title={title} disabled={isDisabled} onClick={onClick} className={classList.join(' ')}>
      <Icon className={styles.icon} icon={iconName} />
    </button>
  )
}

export default RoundButton
