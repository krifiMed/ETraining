import React, { Component } from 'react'

import { CCard, CCardBody, CCardHeader, CCol, CRow , CButton ,CAlert} from '@coreui/react'

import axios from 'axios';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


export default class detailsInstitutes extends Component {

    constructor(props) {
        super(props);
        this.state = {
        institut: [],
        inscrits : [],
        dejaInscrit : false,
        success : false 
        };
    }

    handleClickSignUp() {

      confirmAlert({
        title: 'Confirm to sign up in this Institute',
        message: 'Are you sure to do this.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => {
              axios.get('http://localhost:9090/bookapi/api/inscrit_institut/'+localStorage.getItem('id')+'/'+this.props.match.params.id).then((response)=>{
                this.setState({
                institut : response.data,
                success : true
              })
              console.log('sign up')
              setTimeout(() => {
                console.log('time out!')
                this.props.history.push('/institutes');
              }, 4000);
            });

            }
          },
          {
            label: 'No',
            
          }
        ]
      });
      
    }

    componentDidMount() {
        //const roleuser =   ;
       // console.log('recuperation du details du meeting'+localStorage.getItem('id'))
       axios.get('http://localhost:9090/bookapi/api/instituts/'+this.props.match.params.id).then((response)=>{
        this.setState({
            institut : response.data
        })
       // console.log(this.state.institut)
       });

       axios.get('http://localhost:9090/bookapi/api/inscrit_institut/'+localStorage.getItem('id')).then((response)=>{
        this.setState({
            inscrits : response.data
        })

        this.state.inscrits.forEach(element => {

        //  console.log("ok");
            if(element.user_i.id == localStorage.getItem('id') && element.institut_p.id == this.props.match.params.id)
            {
              this.setState({
                dejaInscrit : true,
              })            
             
            }
          
        });
      
      
       });

       

    }

    render() {
        return (
            <CRow>
            <CCol>
                <center>
             
              <CCard>
              {
              this.state.success===true
              ?
              <CAlert color="success">
                Sign up successfully
              </CAlert>
              :
              ""

            }
                <CCardHeader>
                  Formation Details
                </CCardHeader>
                <CCardBody>
                    <table className="table table-striped table-hover">
                      <tbody>
                        
                              <tr>
                                <td>Name:  :</td>
                                <td><strong>{this.state.institut.name}</strong></td>
                              </tr>
      
                              <tr>
                                <td> Adress :</td>
                                <td><strong>{this.state.institut.adresse}</strong></td>
                              </tr>
      
                              <tr>
                                <td> Phone :</td>
                                <td><strong>{this.state.institut.tel}</strong></td>
                              </tr>
      
                              <tr>
                                <td>Number of Student :</td>
                                <td><strong>{this.state.institut.nombre}</strong></td>
                              </tr>
                                          
                      </tbody>
                    </table>
                </CCardBody>
              </CCard>
                <center> 
                  {
                    this.state.dejaInscrit
                    ?
                    <CButton color="success" size="sm" className="btn-pill btn btn-success btn-sm"  >
                   Already Sign up in this Institute
                   </CButton>
                   :
                   <CButton color="info" size="sm" className="btn-pill btn btn-info btn-sm" onClick = {() => this.handleClickSignUp()} >
                   sign up in this institute...
                   </CButton>
                  }  
               
                 
                  
                  </center>
              </center>
            </CCol>
          </CRow>
        )
    }
}
