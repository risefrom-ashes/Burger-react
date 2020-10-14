import React from 'react'
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem'

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/'>Burger Builder</NavigationItem>
      {props.isAuthenticated?<NavigationItem link='/orders'>Orders</NavigationItem>:null}
      {props.isAuthenticated?<NavigationItem link='/logout'>Log Out</NavigationItem>:<NavigationItem link='/auth'>Log In/Register</NavigationItem>}
    </ul>
  )
}

export default navigationItems;