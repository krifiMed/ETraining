import React, { Component } from 'react'

import { CCard, CCardBody, CCardHeader, CCol, CRow ,CButton,CAlert } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

export default class DetailsFormation extends Component {

    constructor(props) {
        super(props);
        this.state = {
        formations: [],
        participations : [], 
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
              axios.get('http://localhost:9090/bookapi/api/participe/'+localStorage.getItem('id')+'/'+this.props.match.params.id).then((response)=>{
                this.setState({
                institut : response.data, 
                success : true
              })
              setTimeout(() => {
                console.log('time out!')
                this.props.history.push('/formations');
              }, 4000);
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
        
       axios.get('http://localhost:9090/bookapi/api/formations/'+this.props.match.params.id).then((response)=>{
        this.setState({
          formations : response.data
        })
        //console.log(this.state.formations)
       });
       //GET PARTICIPATION BY ID USER

       axios.get('http://localhost:9090/bookapi/api/participe/'+localStorage.getItem('id')).then((response)=>{
        this.setState({
          participations : response.data
        })
        console.log(this.state.participations)
        this.state.participations.forEach(element => {

          //  console.log("ok");
              if(element.user_p.id == localStorage.getItem('id') && element.formation_p.id == this.props.match.params.id)
              {
                this.setState({
                  dejaInscrit : true,
                })            
               console.log('deja inscrit')
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
                Your Participation has been saved successfully
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
                          <td>Nom de Formation  :</td>
                          <td><strong>{this.state.formations.name}</strong></td>
                        </tr>

                        <tr>
                          <td> Date Formation :</td>
                          <td><strong>{this.state.formations.date}</strong></td>
                        </tr>

                        <tr>
                          <td> Type :</td>
                          <td><strong>{this.state.formations.type}</strong></td>
                        </tr>

                        <tr>
                          <td>Description :</td>
                          <td><strong>{this.state.formations.description}</strong></td>
                        </tr>
                                    
                </tbody>
              </table>
          </CCardBody>
        </CCard>

        {
          localStorage.getItem('role') !== 'STUDENT'
          ?
          ""
                   :
                   
                     this.state.dejaInscrit !== true
                     ? 
                     <CButton color="success" size="sm" className="btn-pill btn btn-success btn-sm" onClick = {() => this.handleClickSignUp()} >
                        Participate to this formation ?...
                   </CButton>
                   : 
                   <CButton color="info" size="sm" className="btn-pill btn btn-info btn-sm"  >
                        Already Participate in this Formation
                   </CButton>

                   
                   

        }
          
                
                           
                  </center>
      </CCol>
    </CRow>
        )
    }
}
