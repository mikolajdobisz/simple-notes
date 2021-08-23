import { Icon } from '@iconify/react';
import styles from '../styles/IconButton.module.scss';

const IconButton = ({iconName, onClick, style, isDark}) => {

  const classList = [styles.Icon];
  if(isDark) classList.push(styles.dark);

  return (
    <Icon style={
      style != null ? style : {}
    } className={classList.join(" ")} onClick={onClick} icon={iconName}/>
  )
}

export default IconButton
