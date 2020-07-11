import React, { Component } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow ,CButton} from '@coreui/react'

import axios from 'axios';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


export default class inscriptions extends Component {

    constructor(props){
        super(props)
        this.state ={      
            inscriptions: [], 
            loading : true    
        }
    }

    componentDidMount() {
       
       axios.get('http://localhost:9090/bookapi/api/participantsinstitut/'+this.props.match.params.id).then((response)=>{
        this.setState({
            inscriptions : response.data,
            loading : false
        })
        console.log(this.state.inscriptions)
       });
    }

    handleClickaccpete(id) {
        confirmAlert({
            title: 'Confirm to make this student present',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                  axios.get('http://localhost:9090/bookapi/api/valide_inscrit_institut/'+id).then((response)=>{
                   console.log(response.data)   
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
        let inscriptions = this.state.inscriptions.map((p) => {
            return (
            <tr key={p.id} >
                <td>{p.institut_p.name}</td>
                 <td>{p.user_i.lastName}  {p.user_i.firstName}</td>
                 <td> {p.user_i.diplome } </td>
                <td>
                    {p.valide ?  <CButton color="success" size="sm" className="btn-pill btn btn-success btn-sm" >ACCEPTED</CButton> 
                : 
                <CButton color="success" size="sm" className="btn-pill btn btn-warning btn-sm" >not yet Accepted</CButton> 
                }</td>
                <th>
                    <center>
                        {
                            p.valide
                            ?
                            ""
                            : 
                            <CButton color="success" size="sm" className="btn-pill btn btn-success btn-sm" onClick={() => this.handleClickaccpete(p.id)} >ACCEPT</CButton>
                        }
                   
                
                    </center>
                    </th>
            </tr>
            )})
        return (
            <CRow>
            <CCol>
                <center>
              <CCard>
                <CCardHeader>
                  Formation Details
                </CCardHeader>
                <CCardBody>
                    <table className="table table-striped table-hover">
                        <thead>
                                  <tr>
                                      <th>  Institut  :</th>
                                      <th> Student Name :</th>
                                      <th>Student Diplome</th>
                                      <th> Accepted ?</th>
                                      
                                      <th><center>ACTIONS</center></th>
                                  </tr>
                        </thead>
                      <tbody>
      
                        {
                            inscriptions
                        }
                              
      
      
                                 
                      </tbody>
                    </table>
                </CCardBody>
              </CCard>
              
              </center>
            </CCol>
          </CRow>
        )
    }
}
