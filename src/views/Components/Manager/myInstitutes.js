import React, { Component } from 'react'

import axios from 'axios';

import { CContainer} from '@coreui/react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from '../../../assets/icons/institut.png';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import {
    
    CCard,
    CCardBody,
    
    CCardHeader,
    CCol,
    CRow,
    CButton,
  } from  '@coreui/react'

export default class myInstitutes extends Component {

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
       axios.get('http://localhost:9090/bookapi/api/instituts/iduser/'+localStorage.getItem('id')).then((response)=>{
        this.setState({
            institutes : response.data,
            loading : false
        })
        console.log(this.state.institutes)
       });
    }

    handleClickDelete(id) {
      confirmAlert({
        title: 'Confirm to sign up in this Institute',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
        axios.delete('http://localhost:9090/bookapi/api/instituts/'+id).then((response)=>{
            
            this.componentDidMount();
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
                  <Link  size="sm" className="btn-pill btn btn-info btn-sm" to={`/inscriptions/institutes/${institut.id}`}>Inscriptions</Link>
                  <Link  size="sm" className="btn-pill btn btn-warning btn-sm" to={`/institutes/update/${institut.id}`}>update Institute</Link>
                  
                  <CButton  size="sm" className="btn-pill btn btn-danger btn-sm" onClick={() => this.handleClickDelete(institut.id)} >Delete</CButton>
                  </center>
                  
                </CCardBody>
              </CCard>
            </CCol>
          )
        }}
        )
        
            return (
              
                <CContainer>
                   <center>   <Link className="btn-pill btn btn-info btn-sm" to={`/institutes/add`} >click here to add new Institutes..</Link></center>
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
