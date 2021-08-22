import { Icon } from '@iconify/react';

const RoundButton = ({iconName, onClick}) => {
  return (
    <div onClick={onClick} className="RoundButton">
      <Icon className="icon" icon={iconName} />
    </div>
  )
}

export default RoundButton
