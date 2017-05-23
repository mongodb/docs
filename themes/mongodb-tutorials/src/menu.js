import React from 'react'


const Menu = (props) => {
  return (
    <ul className="menu">
      { props.children }
    </ul>
  )
}

export default Menu
