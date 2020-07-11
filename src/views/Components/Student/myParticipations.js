import React, { Component } from 'react'


import { CCard, CCardBody, CCardHeader, CCol, CRow ,CButton} from '@coreui/react'
import axios from 'axios';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


import Moment from 'react-moment';


export default class myParticipations extends Component {

    constructor(props){
        super(props)
        this.state ={      
            participations: [], 
            loading : true    
        }
    }

    handleClickSignUp(id) {

        confirmAlert({
          title: 'Confirm to sign up in this Institute',
          message: 'Are you sure to do this.',
          buttons: [
            {
              label: 'Yes',
              onClick: () => {
                axios.delete('http://localhost:9090/bookapi/api/participe/'+id).then((response)=>{
                  this.setState({
                  institut : response.data
                })
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
       axios.get('http://localhost:9090/bookapi/api/participe/'+localStorage.getItem('id')).then((response)=>{
        this.setState({
            participations : response.data,
            loading : false
        })
        console.log(this.state.participations[0])
       });
    }

    render() {
        let participations = this.state.participations.map((p) => {
            return (
            <tr key={p.id} >
                <td>{p.formation_p.name}</td>
                 <td>{p.user_p.lastName}  {p.user_p.firstName}</td>
                <td><Moment 
                date={p.date} />
                </td>
                <td>{p.valide ? "Accepted" : "Not Yet Accepted"}</td>
                <td>{p.presence ? "Present" : "Not Present"}</td>
                <td> {p.note ===0 ? "Not Yet Noted" : p.note+"/20"} </td>
                <th>
                    <center>
                <CButton color="danger" size="sm" className="btn-pill btn btn-danger btn-sm" onClick = {() => this.handleClickSignUp(p.id)} >DELETE</CButton>
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
            Formation Details
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                  <thead>
                            <tr>
                                <th>  Formation  :</th>
                                <th> Teacher :</th>
                                <th>Date inscription</th>
                                <th> Accepted ?</th>
                                <th>Presence</th>
                                <th>Note</th>
                                <th><center>ACTIONS</center></th>
                            </tr>
                  </thead>
                <tbody>

                  {
                      participations
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
