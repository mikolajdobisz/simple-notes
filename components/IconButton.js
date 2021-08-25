import { Icon } from '@iconify/react';
import styles from '../styles/IconButton.module.scss';

const IconButton = ({iconName, onClick, style, isDark}) => {
  const getClasses = () => {
    const dark = isDark ? styles.dark : "";
    return styles.Icon + " " + dark;
  }

  return (
    <Icon style={
      style != null ? style : {}
    } className={getClasses()} onClick={onClick} icon={iconName}/>
  )
}

export default IconButton
