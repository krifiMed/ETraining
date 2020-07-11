import React, { Component } from 'react'

import { Link } from 'react-router-dom';
import Notifications, {notify} from 'react-notify-toast';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import  { withRouter } from 'react-router-dom';


import axios from 'axios';



 class Login extends Component {

    constructor(props){
        super(props)
        this.state ={
            email : '', 
            password : '', 
        }
    }

    //change input

        handleInputChange = (event) => {
            event.preventDefault() 
            console.log(event.target.value)
            this.setState({
              [event.target.name] : event.target.value,
             
            })
        }
            // post
        handleSubmit = (event) => {
            event.preventDefault() 
            const data = this.state
            console.log(data)

            axios.get('http://localhost:9090/bookapi/api/user/login?email='+data.email+'&password='+data.password)

        .then( (response)=> {
          console.log(response);
          if (response.status === 200) {
            const user = response.data;
            

            if(user.id!=null){
                

                console.log("sucess") 
                localStorage.setItem('id', user.id ); 
                localStorage.setItem('firstName', user.firstName );
                localStorage.setItem('lastName', user.lastName ); 
                localStorage.setItem('role', user.role );

                this.props.history.push('/dashboard');

               
                
            }
            
            else {
                let myColor = { background: '#FF0000', text: "#FFFFFF" };
                console.log('failed')
                notify.show("invalid", "custom", 5000, myColor); 
                                      
            }
           
          }})
        }
    
    render() {
        return (
            <div className="c-app c-default-layout flex-row align-items-center">
            <CContainer>
              <CRow className="justify-content-center">
                <CCol md="8">
                  <CCardGroup>
                    <CCard className="p-4">
                      <CCardBody>
                        <CForm onSubmit={this.handleSubmit}>
                          <h1>Login</h1>
                          <p className="text-muted">Sign In to your account</p>
                          
                          <CInputGroup className="mb-3">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-user" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput type="text" name="email" placeholder="email" autoComplete="email" onChange={this.handleInputChange} />
                          </CInputGroup>
                          <CInputGroup className="mb-4">
                            <CInputGroupPrepend>
                              <CInputGroupText>
                                <CIcon name="cil-lock-locked" />
                              </CInputGroupText>
                            </CInputGroupPrepend>
                            <CInput type="password" name="password" placeholder="Password" autoComplete="current-password" onChange={this.handleInputChange} />
                          </CInputGroup>
                          <CRow>
                            <CCol xs="6">
                              <CButton color="primary" onClick={this.handleSubmit} className="px-4">Login</CButton>
                            </CCol>
                            <CCol xs="6" className="text-right">
                            <Notifications />
                              <CButton color="link" className="px-0">Forgot password?</CButton>
                            </CCol>
                          </CRow>
                        </CForm>
                      </CCardBody>
                    </CCard>
                    <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                      <CCardBody className="text-center">
                        <div>
                          <h2>Sign up</h2>
                          <p>Sign up in E-Training and wait for the validation of the admin.</p>
                          <Link to="/register">
                            <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                          </Link>
                        </div>
                      </CCardBody>
                    </CCard>
                  </CCardGroup>
                </CCol>
              </CRow>
            </CContainer>
          </div>
        )
    }
}

export default withRouter(Login)
