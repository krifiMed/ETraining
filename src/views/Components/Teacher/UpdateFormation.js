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

  import Notifications, {notify} from 'react-notify-toast';

export default class UpdateFormation extends Component {

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
            formation : [],
            validation : false,
            success : false
        }
        
    }

    componentDidMount() {

        let myColor = { background: '#FF0000', text: "#FFFFFF" };
        console.log('failed')
        notify.show("invalid", "custom", 5000, myColor); 
        const roleuser =  localStorage.getItem('role') ;
        this.setState({
          role : roleuser
        })

        // console.log('role :'+this.state.role)
        axios.get('http://localhost:9090/bookapi/api/user/teachers').then((response)=>{
            this.setState({
                users : response.data,
                
                
            })
           // console.log(response.data)
         });

         axios.get('http://localhost:9090/bookapi/api/formations/'+this.props.match.params.id).then((response)=>{
            this.setState({
                formation : response.data,
                name : response.data.name, 
                type : response.data.type, 
                description : response.data.description,
                date : response.data.date,
                loading : false
            })
            console.log(this.state.name)
         });
    }

    handleSubmit = (event) => {

      if(this.state.name.length===0 || this.state.type.length===0 ||this.state.description.length===0){
        this.setState({
          validation : true
        })
      }
      else{
        // add code 
        event.preventDefault() 
        const data = this.state
        console.log(data)
      
        axios.put('http://localhost:9090/bookapi/api/formations/'+this.props.match.params.id, {
            name: this.state.name, 
            type : this.state.type, 
            description : this.state.description,
            userId :this.state.iduser, 
            date : this.state.date           
        })
      
      .then( (response)=> {
      console.log(response);
      if (response.status === 200) {
        const user = response.data;  
          this.setState({
            validation : false,
            success : true
          })
          setTimeout(() => {
            console.log('time out!')
            this.props.history.push('/formation/myformations');
          }, 4000);
      }
    })
      }
        
      
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
      <Notifications /> 
      {
              this.state.loading
              ? 
              <div className="animated fadeIn pt-1 text-center">Loading...</div>
              :
        <CRow className="justify-content-center">
             <Notifications />

             

          <CCol md="9" lg="7" xl="6">
            {
              this.state.validation ===true
              ?
              <CAlert color="danger">
                    Please Check your informations informations
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
                  <p className="text-muted">Update This Formation</p>
                 
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
                    <CInput type="type" name="type"  value={this.state.type}  placeholder="type" autoComplete="type" onChange={this.handleInputChange} />
                  </CInputGroup>
                  
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="description" name="description" value={this.state.description}  placeholder="description" autoComplete="new-description" onChange={this.handleInputChange}  />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="date" name="date" value={this.state.date} onChange={this.handleInputChange} data-date-format="DD MMMM YYYY" />
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
                 
                
                   <CButton color="success" onClick={this.handleSubmit} block>Update Your formation</CButton>
                 
                  
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
