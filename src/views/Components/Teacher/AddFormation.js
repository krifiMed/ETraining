import React, { Component } from 'react'
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
    CSelect,
    CAlert
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
  import axios from 'axios';

export default class AddFormation extends Component {

  constructor(props){
    super(props)
    this.state ={
        name : '', 
        type : '', 
        description : '', 
        date:'', 
        iduser:'',
        role : '', 
        users : [],
        loading : true,
        validattion : false , 
        success : false
    }
    
}

componentDidMount() {
  const roleuser =  localStorage.getItem('role') ;
  this.setState({
    role : roleuser
  })
 // console.log('role :'+this.state.role)
    axios.get('http://localhost:9090/bookapi/api/user/teachers').then((response)=>{
        this.setState({
            users : response.data,
            loading : false
        })
        console.log(this.state.users)
       });
  
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

  if(this.state.name.length === 0 || this.state.description.length === 0 || this.state.type.length === 0 ){
    this.setState({
      validation : true
    })
  }
  else {

  
  event.preventDefault() 
  const data = this.state
  console.log(data)

  axios.post('http://localhost:9090/bookapi/api/formations', {
      name: this.state.name, 
      type : this.state.type, 
      description : this.state.description,
      userId :localStorage.getItem('id'), 
      date : this.state.date           
  })

.then( (response)=> {
console.log(response);
if (response.status === 200) {
  const user = response.data;
  console.log(user)
  this.setState({
    validation : false, 
    success : true
  })
  setTimeout(() => {
    console.log('time out!')
    this.props.history.push('/formation/myformations');
  }, 4000);
  
}})
}
}

    render() {
        return (
            <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
     
        <CRow className="justify-content-center">
          
          <CCol md="9" lg="7" xl="6">
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
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <center>
                  <h1>Formation</h1>
                  <p className="text-muted">Add New Formation</p>
                  </center>
                  
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" name="name" placeholder="name" autoComplete="name" onChange={this.handleInputChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="type" name="type" placeholder="type" autoComplete="type" onChange={this.handleInputChange} />
                  </CInputGroup>
                  
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="description" name="description"  placeholder="description" autoComplete="new-description" onChange={this.handleInputChange}  />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="date" name="date" onChange={this.handleInputChange} data-date-format="DD MMMM YYYY" />
                  </CInputGroup>

                  {
                    this.state.role ==='MANAGER' 
                    ? 
                    <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CSelect id="lang" name="iduser" onChange={this.handleInputChange} >
                    <option  value="">select a Teacher</option>
                    {
                    this.state.users.map((u,index) => {
                    return <option key={index} value={u.id}>{u.firstName} - {u.lastName}</option>;
                    }
                    )}
                    </CSelect>
                  </CInputGroup>
                  :
                  <p></p>

                  }
                 
                  <CButton color="success" onClick={this.handleSubmit} block>Add new Formation</CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
        )
    }
}
