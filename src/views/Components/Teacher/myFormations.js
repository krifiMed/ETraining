import React, { Component } from 'react'

import axios from 'axios';

import { CContainer} from '@coreui/react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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

export default class myFormations extends Component {
    constructor(props){
        super(props)
        this.state ={      
            formations: [], 
            loading : true    
        }
    }

    componentDidMount() {
        //const roleuser =   ;
       // console.log('recuperation du details du meeting'+localStorage.getItem('id'))
       axios.get('http://localhost:9090/bookapi/api/formations/iduser/'+localStorage.getItem('id')).then((response)=>{
        this.setState({
            formations : response.data,
            loading : false
        })
        console.log(this.state.formations)
       });
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
    render() {
        

          let formations = this.state.formations.map((formation) => {
            if(formation.deleted===false)
            {
            
          return (
            <CCol key={formation.id.toString()} xs="12" sm="6" md="4">
              <CCard key={formation.id.toString()} color="gradient-secondary">
                <CCardHeader>
                    <center>            
                        <h6>{formation.name}</h6>   <p> Date: {formation.date}</p> 
                    </center>
                </CCardHeader>
                <CCardBody>
                    <center>
                  {formation.type} <br></br>
                  {formation.description}
                  
                  </center>
    
                  <center>
                  <br></br> 
                  <Link  size="sm" className="btn-pill btn btn-info btn-sm" to={`/participations/formations/${formation.id}`}>See  participants</Link>

                  <Link  size="sm" className="btn-pill btn btn-warning btn-sm" to={`/formation/modifier/${formation.id}`}>update Formations</Link>
                  
                  <CButton  size="sm" className="btn-pill btn btn-danger btn-sm" onClick={() => this.handleClickDelete(formation.id)} >Delete</CButton>
                  </center>
                  
                </CCardBody>
              </CCard>
            </CCol>
          )
        }}
        )
      
        
            return (
              
                <CContainer>
                    <center>   <Link className="btn-pill btn btn-success btn-sm" to={`/formation/addformation`} >click here to add new Formation..</Link></center>
                <br></br>
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

