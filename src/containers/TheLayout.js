import React from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = () => {

// role user change menu
//  const roleuser =  localStorage.getItem('role') ;
//
//  console.log('layout'); 
//  console.log(roleuser); 


  return (
    <div className="c-app c-default-layout">
     
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          <TheContent/>
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
