import { Icon } from '@iconify/react';
import styles from '../styles/IconButton.module.scss';

const IconButton = ({iconName, onClick, style, isDark, title}) => {
  const getClasses = () => {
    const dark = isDark ? styles.dark : "";
    return styles.Icon + " " + dark;
  }

  return (
    <span title={title}>
      <Icon style={
        style != null ? style : {}
      } 
      className={getClasses()} 
      onClick={onClick} 
      icon={iconName}
      />
    </span>
  )
}

export default IconButton
