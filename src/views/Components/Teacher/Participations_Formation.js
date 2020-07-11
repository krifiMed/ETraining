import React, { Component } from 'react'

import { CCard, CCardBody, CCardHeader, CCol, CRow,CButton ,CInput} from '@coreui/react'
import axios from 'axios';
import { BrowserRouter as Router, Route, Link  } from "react-router-dom";

import Moment from 'react-moment';

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


export default class Participations_Formation extends Component {

    constructor(props){
        super(props)
        this.state ={      
            participations: [], 
            loading : true  , 
            note : 0  
        }
    }

    handleClickvaliate(id) {
        confirmAlert({
            title: 'Confirm to sign up in this Institute',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                  axios.get('http://localhost:9090/bookapi/api/valide/'+id).then((response)=>{
                   console.log('validate successfully')   
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

    handleClickpresence(id) {
        confirmAlert({
            title: 'Confirm to make this student present',
            message: 'Are you sure to do this.',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                  axios.get('http://localhost:9090/bookapi/api/presence/'+id).then((response)=>{
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

    handleInputChange = (event) => {
        event.preventDefault() 
        console.log(event.target.value)
        this.setState({
          [event.target.name] : event.target.value,    
        })

        if(event.target.value >20) event.target.value =0
    }

    handleClickNote(id) {
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui'>
                  <h1>Are you sure?</h1>
                  <p>You want to make note to this student ?</p>
                  <CInput type="number" name="note" min="0" max="20" placeholder="note" autoComplete="new-note" onChange={this.handleInputChange}  />
                  <br></br>
                  <center>
                  <button className="btn-pill btn btn-danger btn-sm" onClick={onClose}>No</button>
                  <button
                  className="btn-pill btn btn-success btn-sm"
                    onClick={() => {
                        axios.get('http://localhost:9090/bookapi/api/note/'+id+'/'+this.state.note).then((response)=>{
                            console.log(response.data)   
                            this.componentDidMount() ;    
                            });
                      onClose();
                    }}
                  >
                    Yes,add it!
                  </button>
                  </center>
                </div>
              );
            }
          });
    }

    componentDidMount() {
        //const roleuser =   ;
       // console.log('recuperation du details du meeting'+localStorage.getItem('id'))
       axios.get('http://localhost:9090/bookapi/api/participantsformation/'+this.props.match.params.id).then((response)=>{
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
                <td><Moment 
                date={p.date} />
                </td>
                <td>{p.valide 
                ? 
                <p color="success" size="sm" className="btn-pill btn btn-info btn-sm">ACCEPTED</p> 
                : 
                <p color="warning" size="sm" className="btn-pill btn btn-danger btn-sm">not yet accepted</p>
                }
                </td>
                <td>{p.presence 
                ? 
                <p color="success" size="sm" className="btn-pill btn btn-success btn-sm">Present</p> 
                : 
                <p color="warning" size="sm" className="btn-pill btn btn-warning btn-sm">not Present"</p>
                }
                </td>
                <td>
                    {p.note ===0 
                    ? 
                    <p color="success" size="sm" className="btn-pill btn btn-warning btn-sm">Not Notted </p> 
                    : 
                    <p color="success" size="sm" className="btn-pill btn btn-success btn-sm">{p.note} /20</p> 
                    } 
                </td>

                <td>
                    <center>
               {
                   p.valide 
                   ? 
                   "" 
                   : 
                   <CButton color="info" size="sm" className="btn-pill btn btn-info btn-sm" onClick={() => this.handleClickvaliate(p.id)} >Validate</CButton>

               }   

            {
                p.presence 
                ? 
                ""
                :
                <CButton color="success" size="sm" className="btn-pill btn btn-success btn-sm" onClick={() => this.handleClickpresence(p.id)} >Presence</CButton>
            }
            {
                p.note == 0 
                ?
                <CButton color="success" size="sm" className="btn-pill btn btn-warning btn-sm" onClick={() => this.handleClickNote(p.id)} >Note</CButton>
                : 
                ""

            }
         
                    </center>
                </td>
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
                                <th>Nom de Formation  :</th>
                                <th>Date inscription</th>
                                <th> Accepted ?</th>
                                <th>Presence</th>
                                <th>Note</th>
                                <th><center>Actions</center></th>
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
