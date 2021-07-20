import React, { useEffect } from 'react'

const Icon = ({
                name, 
                customStyle, 
                isBtn,
                onClick
              }) => {

  const btnClass = () => {
    return isBtn == true ? " icon-button" : ""
  }

  return (
    <i onClick={onClick} style={customStyle} className={"material-icons icon" + btnClass()}>
      {name}
    </i>
  )
}

export default Icon
