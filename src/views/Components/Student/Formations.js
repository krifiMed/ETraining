import React, { Component } from 'react'
import axios from 'axios';

import { CContainer} from '@coreui/react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

import moment from "moment";
import Moment from 'react-moment';
import logo from '../../../assets/icons/formation.png';
import {
    CBadge,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CRow,
    CButton,
    CSwitch,
    CLink
  } from  '@coreui/react'


export default class Formations extends Component {

    constructor(props){
        super(props)
        this.state ={      
            formations: [], 
            loading : true    
        }
    }

    handleClickDelete = (id) => {

      confirmAlert({
        title: 'Confirm to sign up in this Institute',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              axios.delete('http://localhost:9090/bookapi/api/formations/'+id).then((response)=>{
               console.log('deleted successfully')   
               this.componentDidMount() ;    
               });
             

            }
          },
          {
            label: 'No',
            onClick: () => alert('Click No')
          }
        ]
      });


      
    }

    componentDidMount() {
        //const roleuser =   ;
       // console.log('recuperation du details du meeting'+localStorage.getItem('id'))
       axios.get('http://localhost:9090/bookapi/api/formations').then((response)=>{
        this.setState({
            formations : response.data,
            loading : false
        })
        console.log(this.state.formations)
       });
    }
    render() {
       
    let formations = this.state.formations.map((formation) => {
        if(!formation.deleted)
        {
    
      return (
        <CCol key={formation.id.toString()} xs="12" sm="6" md="4">
          <CCard key={formation.id.toString()} color="gradient-secondary">
            <CCardHeader>
                <center>
                     <img src={logo} height="50px" width="50px" alt="Logo" />
                </center>
 
            </CCardHeader>
            <CCardBody>
                <center>
                          
                    <h6>{formation.name}</h6>   <p> Date: {formation.date}</p> 
                
              {formation.type} <br></br>
              {formation.description}
              
              </center>

              <center>
              <br></br>  
              
              {
                localStorage.getItem('role')==="MANAGER"
                ? 
                <div>
                <Link  size="sm" className="btn-pill btn btn-info btn-sm" to={`/participations/formations/${formation.id}`}>See  participants</Link>

                <Link  size="sm" className="btn-pill btn btn-warning btn-sm" to={`/formation/modifier/${formation.id}`}>update Formations</Link>
                  
                <CButton  size="sm" className="btn-pill btn btn-danger btn-sm" onClick={() => this.handleClickDelete(formation.id)} >Delete</CButton>
                </div>

                  :

                  <Link className="btn-pill btn btn-success btn-sm" to={`/formations/details/${formation.id}`}>see details</Link>

                
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
               <center> 
                 {
                   localStorage.getItem('role') === 'TEACHER' 
                   ?
                   <Link className="btn-pill btn btn-info btn-sm" to='/formation/myformations'>See your Formations ?</Link>
                   :
                   ""
                 }
                 {
                   localStorage.getItem('role') === 'STUDENT'
                   ?
                   <Link className="btn-pill btn btn-info btn-sm" to='/participations'>See your Participations ?</Link>
                   :
                   ""
                 }
                 {
                   localStorage.getItem('role') === 'MANAGER'
                   ? 
                   <Link className="btn-pill btn btn-info btn-sm" to='/formation/addformation'>Add Formations</Link>
                   :
                   ""

                 }
                 
                 </center>      
                 <br></br>
            <CRow>
        
           
                {
                    this.state.loading
                    ? 
                    <div className="animated fadeIn pt-1 text-center">Loading...</div>
                    :
                    formations
                  }
                  </CRow>
                </CContainer>
                
        )
    }
}
