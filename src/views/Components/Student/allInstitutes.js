import React, { Component } from 'react'

import axios from 'axios';

import { CContainer} from '@coreui/react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from '../../../assets/icons/institut.png';
import {
    
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
  } from  '@coreui/react'

export default class allInstitutes extends Component {

    constructor(props){
        super(props)
        this.state ={      
            institutes: [], 
            loading : true    
        }
    }

    componentDidMount() {
        //const roleuser =   ;
       // console.log('recuperation du details du meeting'+localStorage.getItem('id'))
       axios.get('http://localhost:9090/bookapi/api/instituts').then((response)=>{
        this.setState({
            institutes : response.data,
            loading : false
        })
        console.log(this.state.institutes)
       });
    }

    render() {
        let institutes = this.state.institutes.map((institut) => {
            if(!institut.deleted)
            {
        
          return (
            <CCol  key={institut.id.toString()}  xs="12" sm="6" md="4">
              <CCard key={institut.id.toString()} color="gradient-secondary">
                <CCardHeader>
                    <center>            
                    <img src={logo} height="50px" width="50px" alt="Logo" />
                    </center>
                </CCardHeader>
                <CCardBody>
                    <center>
                    {institut.name} <br></br>
                  {institut.adresse} <br></br>
                  {institut.nombre} Students
                  
                  </center>
    
                  <center>
                  <br></br> 
                  {
                    localStorage.getItem('role') ==="STUDENT" || localStorage.getItem('role') ==="TEACHER" 
                    ?
                    <Link className="btn-pill btn btn-success btn-sm" to={`/institutes/details/${institut.id}`}>see details</Link>
                    :
                    ""
                  } 
                 
                  </center>
                  
                </CCardBody>
              </CCard>
            </CCol>
          )
        }}
        )
        
            return (
              
                <CContainer>
                  {
                    localStorage.getItem('role') ==="STUDENT" || localStorage.getItem('role') ==="TEACHER" 
                    ?
                    <center> <Link className="btn-pill btn btn-info btn-sm" to='/institutes/inscriptions'>See your Inscriptions ?</Link></center>
                    :
                    ""

                  }
                          
                   <br></br>
                   <br></br>
                <CRow>
            
            
                   
                    {
                        this.state.loading
                        ? 
                        <div className="animated fadeIn pt-1 text-center">Loading...</div>
                        :
                        institutes
                      }
                      </CRow>
                    </CContainer>
                    
            )
        }
}
