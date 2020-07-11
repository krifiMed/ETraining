import React, { Component }  from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import axios from 'axios';



export default class Register extends Component {

    constructor(props){
        super(props)
        this.state ={
            email : '', 
            password : '', 
            firstName : '', 
            lastName:'', 
            role:'ADMIN',
            date: ''
        }
        
    }

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
     }

      // post
      handleSubmit = (event) => {
        event.preventDefault() 
        const data = this.state
        console.log(data)

        axios.post('http://localhost:9090/bookapi/api/user/', {
            firstName: this.state.firstName, 
            lastName : this.state.lastName, 
            email : this.state.email,
            role :this.state.role, 
            password : this.state.password           
        })

    .then( (response)=> {
      console.log(response);
      if (response.status === 200) {
        const user = response.data;
        console.log(user)
      }})
    }


    render() {
        return (
            <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" name="firstName" placeholder="firstName" autoComplete="firstName" onChange={this.handleInputChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" name="lastName" placeholder="lastName" autoComplete="lastName" onChange={this.handleInputChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" name="email" placeholder="Email" autoComplete="email" onChange={this.handleInputChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" name="password"  placeholder="Password" autoComplete="new-password" onChange={this.handleInputChange}  />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="date" name="date" onChange={this.handleInputChange} data-date-format="DD MMMM YYYY" />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CSelect id="lang" name="role" onChange={this.handleInputChange} >
                        <option value="ADMIN">ADMIN</option>
                        <option value="MANAGER">MANAGER</option>
                        <option value="TEACHER">TEACHER</option>
                        <option value="STUDENT">STUDENT</option>
                    </CSelect>
                  </CInputGroup>
                  <CButton color="success" onClick={this.handleSubmit} block>Create Account</CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block><span>facebook</span></CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block><span>twitter</span></CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
        )
    }
}
