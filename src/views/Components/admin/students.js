import React, { Component } from 'react'

import { CCard, CCardBody, CCardHeader, CCol, CRow ,CButton} from '@coreui/react'
import axios from 'axios';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


import Moment from 'react-moment';

export default class students extends Component {

    constructor(props){
        super(props)
        this.state ={      
            managers: [], 
            loading : true    
        }
    }

    handleClickActivate(id) {

        confirmAlert({
          title: 'Confirm to activate this user ',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                axios.get('http://localhost:9090/bookapi/api/user/activate/'+id).then((response)=>{
                  this.setState({
                  institut : response.data
                })
                console.log('activate')
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

      handleClickDelete(id) {

        confirmAlert({
          title: 'Confirm to delete this user',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                axios.delete('http://localhost:9090/bookapi/api/user/'+id).then((response)=>{
               
                console.log('Delete')

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
       axios.get('http://localhost:9090/bookapi/api/user/students').then((response)=>{
        this.setState({
            managers : response.data,
            loading : false
        })
        console.log(this.state.managers)
       });
    }
    render() {
        let managers = this.state.managers.map((p) => {
            return (
            <tr key={p.id} >
                <td>{p.firstName} {p.lastName}</td>
                 <td>{p.email}  </td>
            <td>{p.role}</td>
                <td>{p.isactive
                 ? 
                 <CButton color="info" size="sm" className="btn-pill btn btn-info btn-sm" >Active</CButton>
                  : 
                  <CButton color="warning" size="sm" className="btn-pill btn btn-warning btn-sm" >Not active</CButton>
                  }</td>
                
                <th>{p.diplome}</th>
                <th>
                    <center>
                        {
                            p.isactive === false
                            ?
                            <CButton color="success" size="sm" className="btn-pill btn btn-success btn-sm" onClick = {() => this.handleClickActivate(p.id)} >Activate</CButton>
                            :
                            ""
                        }
                   
                <CButton color="danger" size="sm" className="btn-pill btn btn-danger btn-sm" onClick = {() => this.handleClickDelete(p.id)} >DELETE</CButton>
                    </center>
                    </th>
            </tr>
            )
        })
        return (
            <CRow>
      <CCol>
          <center>
        <CCard>
          <CCardHeader>
            Students Details
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                  <thead>
                            <tr>
                                <th>  Name  </th>
                                <th> Email </th>
                                <th>Role</th>
                                <th> Is Active ?</th>
                                <th> Diplome</th>
                                <th><center>ACTIONS</center></th>
                            </tr>
                  </thead>
                <tbody>

                  {
                      managers
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
