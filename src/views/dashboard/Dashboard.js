import React, { lazy } from 'react'
import {
  CCard,
  CCardBody,
  
} from '@coreui/react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))

const Dashboard = () => {

  const roleuser =  localStorage.getItem('role') ;
  const firtName = localStorage.getItem('firstName'); 
  const lastName = localStorage.getItem('lastName')
  return (
    <>
      
      <CCard>
        <CCardBody>
          {
            roleuser ==null
            ?
          <center> <h6>Welcome to the Plateforme E-Training</h6> <br></br> <Link  size="sm" className="btn-pill btn btn-info btn-sm" to={`/login`}>Click here to connect</Link></center>
            :
            <center><h3> Welcome  Mr  {firtName} {lastName} in the Platform E-Training </h3> </center>
          }
         
          </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
