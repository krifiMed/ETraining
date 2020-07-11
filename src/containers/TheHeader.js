import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// routes config
import routes from '../routes'

import { 
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks
}  from './index'

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebarShow)

  const toggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch({type: 'set', sidebarShow: val})
  }

  
  const roleuser =  localStorage.getItem('role') ;

  console.log('layout'); 
  console.log(roleuser);

  if(roleuser==='STUDENT') {

    return (
      <CHeader withSubheader>
        <CToggler
          inHeader
          className="ml-md-3 d-lg-none"
          onClick={toggleSidebarMobile}
        />
        <CToggler
          inHeader
          className="ml-3 d-md-down-none"
          onClick={toggleSidebar}
        />
        <CHeaderBrand className="mx-auto d-lg-none" to="/">
          <CIcon name="logo" height="48" alt="Logo"/>
        </CHeaderBrand>
  
        <CHeaderNav className="d-md-down-none mr-auto">
          <CHeaderNavItem className="px-3" >
            <CHeaderNavLink to="/dashboard">Home</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem  className="px-3">
            <CHeaderNavLink to={`/profile/${localStorage.getItem('id')}`}>Profile</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink to={`/formations`}>Formations</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink to={`/institutes`}>Institutes</CHeaderNavLink>
          </CHeaderNavItem>
        </CHeaderNav>
  
          <CHeaderNav className="px-3">
          {roleuser}
          <TheHeaderDropdown/>
          <CHeaderNavItem  className="px-3">
            <CHeaderNavLink to="/login" onClick={
              () => {
                localStorage.clear()
              }
            }>Logout</CHeaderNavLink>
          </CHeaderNavItem>
        </CHeaderNav>

        
  
        <CSubheader className="px-3 justify-content-between">
          <CBreadcrumbRouter 
            className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
            routes={routes} 
          />
            
        </CSubheader>
      </CHeader>
    )

  }
  else if (roleuser==="ADMIN") {

    return (
      <CHeader withSubheader>
        <CToggler
          inHeader
          className="ml-md-3 d-lg-none"
          onClick={toggleSidebarMobile}
        />
        <CToggler
          inHeader
          className="ml-3 d-md-down-none"
          onClick={toggleSidebar}
        />
        <CHeaderBrand className="mx-auto d-lg-none" to="/">
          <CIcon name="logo" height="48" alt="Logo"/>
        </CHeaderBrand>
  
        <CHeaderNav className="d-md-down-none mr-auto">
          <CHeaderNavItem className="px-3" >
            <CHeaderNavLink to="/dashboard">Home</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem  className="px-3">
            <CHeaderNavLink to="/managers">MANAGERS</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink to ="/students">STUDENTS</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem  className="px-3">
            <CHeaderNavLink to="/teachers">TEACHERS</CHeaderNavLink>
          </CHeaderNavItem>
        </CHeaderNav>
  
        <CHeaderNav className="px-3">
          {roleuser}
          <TheHeaderDropdown/>
          <CHeaderNavItem  className="px-3">
            <CHeaderNavLink to="/login" onClick={
              () => {
                localStorage.clear()
              }
            }>Logout</CHeaderNavLink>
          </CHeaderNavItem>
        </CHeaderNav>
  
        <CSubheader className="px-3 justify-content-between">
          <CBreadcrumbRouter 
            className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
            routes={routes} 
          />
            
        </CSubheader>
      </CHeader>
    )

  }

  else if(roleuser==='TEACHER') {

    return (
      <CHeader withSubheader>
        <CToggler
          inHeader
          className="ml-md-3 d-lg-none"
          onClick={toggleSidebarMobile}
        />
        <CToggler
          inHeader
          className="ml-3 d-md-down-none"
          onClick={toggleSidebar}
        />
        <CHeaderBrand className="mx-auto d-lg-none" to="/">
          <CIcon name="logo" height="48" alt="Logo"/>
        </CHeaderBrand>
  
        <CHeaderNav className="d-md-down-none mr-auto">
          <CHeaderNavItem className="px-3" >
            <CHeaderNavLink to="/dashboard">Home</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem  className="px-3">
            <CHeaderNavLink to={`/profile/${localStorage.getItem('id')}`}>MY PROFILE</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem  className="px-3">
            <CHeaderNavLink to={`/formation/myformations`}>My FORMATIONS</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem  className="px-3">
            <CHeaderNavLink to="/institutes">INSTIUTES</CHeaderNavLink>
          </CHeaderNavItem>
          
        </CHeaderNav>
  
        <CHeaderNav className="px-3">
          {roleuser}
          <TheHeaderDropdown/>
          <CHeaderNavItem  className="px-3">
            <CHeaderNavLink to="/login" onClick={
              () => {
                localStorage.clear()
              }
            }>Logout</CHeaderNavLink>
          </CHeaderNavItem>
        </CHeaderNav>

  
        <CSubheader className="px-3 justify-content-between">
          <CBreadcrumbRouter 
            className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
            routes={routes} 
          />
            
        </CSubheader>
      </CHeader>
    )

  }

  else if(roleuser==='MANAGER') {

    return (
      <CHeader withSubheader>
        <CToggler
          inHeader
          className="ml-md-3 d-lg-none"
          onClick={toggleSidebarMobile}
        />
        <CToggler
          inHeader
          className="ml-3 d-md-down-none"
          onClick={toggleSidebar}
        />
        <CHeaderBrand className="mx-auto d-lg-none" to="/">
          <CIcon name="logo" height="48" alt="Logo"/>
        </CHeaderBrand>
  
        <CHeaderNav className="d-md-down-none mr-auto">
          <CHeaderNavItem className="px-3" >
            <CHeaderNavLink to="/dashboard">Home</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem  className="px-3">
            <CHeaderNavLink to="/formations">Formations</CHeaderNavLink>
          </CHeaderNavItem>
          <CHeaderNavItem  className="px-3">
            <CHeaderNavLink to="/institutes/MyInstitutes">MY Institutes</CHeaderNavLink>
          </CHeaderNavItem>
          
          
        </CHeaderNav>

        <CHeaderNav className="px-3">
          {roleuser}
          <TheHeaderDropdown/>
          <CHeaderNavItem  className="px-3">
            <CHeaderNavLink to="/login" onClick={
              () => {
                localStorage.clear()
              }
            }>Logout</CHeaderNavLink>
          </CHeaderNavItem>
        </CHeaderNav>
  
  
        <CSubheader className="px-3 justify-content-between">
          <CBreadcrumbRouter 
            className="border-0 c-subheader-nav m-0 px-0 px-md-3" 
            routes={routes} 
          />
            
        </CSubheader>
      </CHeader>
    )

  }

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={toggleSidebar}
      />
    </CHeader>
  )
}

export default TheHeader
