import React, { Component } from 'react'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
    CButton,
    CCard,
    CCardBody,
    CCol,
    CContainer,
    CForm,
    CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CRow,
    CSelect,
    CAlert
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
  import axios from 'axios';
  import Notifications, {notify} from 'react-notify-toast';

export default class updateProfile extends Component {

    componentDidMount() {
        //const roleuser =   ;
       // console.log('recuperation du details du meeting'+localStorage.getItem('id'))
       axios.get('http://localhost:9090/bookapi/api/user/'+this.props.match.params.id).then((response)=>{
        this.setState({
            
            email : response.data.email,
            firstName : response.data.firstName,
            lastName : response.data.lastName,
            role : response.data.role,
            date : response.data.date, 
            password : response.data.password, 
            diplome : response.data.diplome , 

         specialite : response.data.specialite ,
            loading : false
        })
        console.log(this.state.date)
       });
    }

    constructor(props){
        super(props)
        this.state ={
            email : '', 
            password : '', 
            firstName : '', 
            lastName:'', 
            role:'ADMIN',
            date: '',
            diplome : '' , 
            specialite:'',
            user: [],
            loading : true, 
            startDate: new Date(),
            validation : false,
            success : false
        }
        
    }


    handleInputChange = (event) => {
        event.preventDefault() 
        console.log(event.target.value)
        this.setState({
          [event.target.name] : event.target.value,    
        })

        console.log(event.target.value.length)
    }

    // post
    handleSubmit = (event) => {
      
      
        if(this.state.firstName.length === 0 || this.state.lastName.length === 0 || this.state.email.length === 0  )
        {
          if(this.state.specialite.length==0 && this.state.diplome.length==0) {
            this.setState({
              validation : true
            })
          }   
        }
        
      
      else {
        console.log(3)
        event.preventDefault() 
        const data = this.state
        console.log(data)

        axios.put('http://localhost:9090/bookapi/api/user/update/'+this.props.match.params.id, {
            firstName: this.state.firstName, 
            lastName : this.state.lastName, 
            email : this.state.email,
            date : this.state.date,
            role :this.state.role, 
            password : this.state.password, 
            diplome : this.state.diplome,
            specialite : this.state.specialite           
        })

    .then( (response)=> {
      console.log(response);
      if (response.status === 200) {
        const user = response.data;
        console.log(user)
        this.setState({
          success : true, 
          validation : false
        })

        setTimeout(() => {
          console.log('time out!')
          this.props.history.push('/profile/'+localStorage.getItem('id'));
        }, 4000);
        
      }
    })
      }
      
    }

    handleChange = datee => {
        this.setState({
          date: datee
          
        });
        console.log(datee)
      };

    

    render() {
        return (

            <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
     
          {
              this.state.loading
              ? 
              <div className="animated fadeIn pt-1 text-center">Loading...</div>
              :
              <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
            {
              this.state.validation ===true
              ?
              <CAlert color="danger">
                    Please Check your informations 
              </CAlert>
              : 
              ""
            }
            {
              this.state.success===true
              ?
              <CAlert color="primary">
                Your formation is Updated Successfully
              </CAlert>
              :
              ""

            }
              <CCardBody className="p-4">
                <CForm>
                    <center>
                            <h1>Profile</h1>
                            <p className="text-muted">Update your profile Here</p>
                  </center>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" name="firstName" value= {this.state.firstName} placeholder="firstName" autoComplete="firstName" onChange={this.handleInputChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" name="lastName" value={this.state.lastName} placeholder="lastName" autoComplete="lastName" onChange={this.handleInputChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" name="email" placeholder="Email" value={this.state.email} autoComplete="email" onChange={this.handleInputChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" name="password" value={this.state.password}  disabled placeholder="Password"  autoComplete="new-password" onChange={this.handleInputChange}  />
                  </CInputGroup>
                  
                    
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="date" name="date" value={this.state.date} onChange={this.handleInputChange} data-date-format="DD MMMM YYYY" />
                   
                  </CInputGroup>
                  
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CSelect id="lang" name="role" disabled onChange={this.handleInputChange} >
                            <option value={this.state.role}>{this.state.role}</option>
                    </CSelect>
                  </CInputGroup>
                  {
                      localStorage.getItem('role') ==='STUDENT' 
                      ?
                      <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>D</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" name="diplome" placeholder="diplome" value={this.state.diplome} autoComplete="diplome" onChange={this.handleInputChange} />
                  </CInputGroup>
                        :

                        <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>D</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" name="specialite" placeholder="specialite" value={this.state.specialite} autoComplete="specialite" onChange={this.handleInputChange} />
                  </CInputGroup>

                  }
                  <CButton color="success" onClick={this.handleSubmit} block>Update Profile</CButton>
                  <Notifications />
                 
                </CForm>
              </CCardBody>
              
            </CCard>
          </CCol>
        </CRow>
          }
        
      </CContainer>
    </div>
        )
    }
}
