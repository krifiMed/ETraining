import React, { Component } from 'react'

import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
        user: []
        };
    }

    componentDidMount() {
        //const roleuser =   ;
       // console.log('recuperation du details du meeting'+localStorage.getItem('id'))
       axios.get('http://localhost:9090/bookapi/api/user/'+localStorage.getItem('id')).then((response)=>{
        this.setState({
          user : response.data
        })
        console.log(this.state.user)
       });
    }
 
    render() {
        return (
            <CRow>
      <CCol>
          <center>
        <CCard>
          <CCardHeader>
          <strong>{this.state.user.firstName}  {this.state.user.lastName}</strong>
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  
                        <tr>
                          <td>Firstname - LastName :</td>
                          <td><strong>{this.state.user.firstName}  {this.state.user.lastName}</strong></td>
                        </tr>

                        <tr>
                          <td> Email :</td>
                          <td><strong>{this.state.user.email}</strong></td>
                        </tr>

                        <tr>
                          <td> DOB :</td>
                          <td><strong>{this.state.user.date}</strong></td>
                        </tr>

                        <tr>
                          <td>ROLE :</td>
                          <td><strong>{this.state.user.role}</strong></td>
                        </tr>

                        {
                            localStorage.getItem('role') ==="STUDENT"
                             ? 
                             <tr>
                             <td>DIPLOME :</td>
                             <td><strong>{this.state.user.diplome}</strong></td>
                           </tr> 
                            : 
                            <tr>
                            <td>SPECIALITY :</td>
                            <td><strong>{this.state.user.specialite}</strong></td>
                          </tr> 
                        }
                                    
                </tbody>
              </table>
          </CCardBody>
        </CCard>
        <center>   <Link className="btn-pill btn btn-success btn-sm" to={`/profile/modifier/${this.state.user.id}`} >click here to update your profile...</Link></center>
        </center>
      </CCol>
    </CRow>
        )
    }
}
