import React, { Component } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow ,CButton} from '@coreui/react'

import axios from 'axios';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default class myInscriptions extends Component {

    
    constructor(props){
        super(props)
        this.state ={      
            inscriptions: [], 
            loading : true    
        }
    }

    handleClickDelete (id) {

        confirmAlert({
            title: 'Confirm to delete this request',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                  axios.delete('http://localhost:9090/bookapi/api/inscrit/'+id).then((response)=>{
                   console.log(response.data)   
                   this.componentDidMount() ;    
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
       
        axios.get('http://localhost:9090/bookapi/api/inscrit_institut/'+localStorage.getItem('id')).then((response)=>{
         this.setState({
             inscriptions : response.data,
             loading : false
         })
         console.log(this.state.inscriptions)
        });
     }
    render() {
        let inscriptions = this.state.inscriptions.map((p) => {
            return (
            <tr key={p.id} >
                <td>{p.institut_p.name}</td>
                 <td>{p.institut_p.adresse}  {p.user_i.firstName}</td>
                 
                <td>
                    {
                    p.valide 
                    ? 
                    <CButton size="sm" className="btn-pill btn btn-success btn-sm" >Accepted</CButton>
                    : 
                    <CButton  size="sm" className="btn-pill btn btn-warning btn-sm" >Not Yet accepted</CButton>
                }
                </td>
                <th>
                    <center>
                        {
                            p.valide 
                            ?
                            "No actions"
                            : 
                            <CButton color="danger" size="sm" className="btn-pill btn btn-danger btn-sm" onClick={() => this.handleClickDelete(p.id)} >DELETE REQUEST</CButton>
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
                ({localStorage.getItem('role')}) inscriptions in institutes
                </CCardHeader>
                <CCardBody>
                    <table className="table table-striped table-hover">
                        <thead>
                                  <tr>
                                      <th>  Institut Name  :</th>
                                      <th> Institut Adress :</th>
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
