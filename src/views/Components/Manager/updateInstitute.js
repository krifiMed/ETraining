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
    CAlert
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
  import axios from 'axios';

export default class updateInstitute extends Component {

    constructor(props){
        super(props)
        this.state =
        {
            name : '', 
            tel : '', 
            adresse : '', 
            nombre:'',
            loading : true,
            validation : false,
            success : false
        }
        
    }

    handleSubmit = (event) => {

      if(this.state.name.length===0 || this.state.tel.length===0 ||this.state.adresse.length===0 || this.state.nombre.length===0 )
      {
        this.setState({
          validation : true
        })
      }else {
        event.preventDefault() 
        const data = this.state
        console.log(data)
      
        axios.put('http://localhost:9090/bookapi/api/instituts/'+this.props.match.params.id, {
            name: this.state.name, 
            tel : this.state.tel, 
            nombre : this.state.nombre,
            userId :localStorage.getItem('id'), 
            adresse : this.state.adresse           
        })
      
      .then( (response)=> {
      console.log(response);
      if (response.status === 200) {
        const user = response.data;
        this.setState({
          success : true,
          validation : false
        })

        setTimeout(() => {
          console.log('time out!')
          this.props.history.push('/institutes/MyInstitutes');
        }, 4000);
        
      
      }
    })
      
        
      }
       
      }


    componentDidMount() {
        const roleuser =  localStorage.getItem('role') ;
        this.setState({
          role : roleuser
        })
       // console.log('role :'+this.state.role)
          axios.get('http://localhost:9090/bookapi/api/instituts/'+this.props.match.params.id).then((response)=>{
              this.setState({
                  institut : response.data,

                  name : response.data.name,
                  tel : response.data.tel, 
                  nombre : response.data.nombre, 
                  adresse : response.data.adresse,
                  loading : false
              })
              console.log(this.state.institut)
             });
        
      }


    
  handleInputChange = (event) => {
    event.preventDefault() 
    console.log(event.target.value)
    this.setState({
      [event.target.name] : event.target.value,    
    })
}
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
                Your Institute is Updated Successfully
              </CAlert>
              :
              ""

            }
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <center>
                  <h1>Institute</h1>
                  <p className="text-muted">Update Institute</p>
                  </center>
                  
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" name="name" value={this.state.name} placeholder="name" autoComplete="name" onChange={this.handleInputChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" name="adresse" value={this.state.adresse} placeholder="adresse" autoComplete="adresse" onChange={this.handleInputChange} />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" name="tel"   placeholder="tel" value={this.state.tel} autoComplete="new-tel" onChange={this.handleInputChange}  />
                  </CInputGroup>
                  
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="number" name="nombre"   placeholder="nombre" value={this.state.nombre} onChange={this.handleInputChange}  />
                  </CInputGroup>
                  
                 
                  <CButton color="success" onClick={this.handleSubmit} block>Update Institute</CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
    }
      </CContainer>
    </div>
        )
    }
}
