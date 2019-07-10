import React, { Component } from 'react'
import { Input,Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export default class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: true
        };
    
        this.toggle = this.toggle.bind(this);
      }
    
      toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
    
      render() {
        return (
          <div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
              <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
              <ModalBody>
                <Input placeholder="username" name="username" onChange={this.handleChange.bind(this)} />
                <Input placeholder="password" name="password" onChange={this.handleChange.bind(this)} />

              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.loginer.bind(this)}>Log-In!</Button>
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
              </ModalFooter>
            </Modal>
          </div>
        );
      }
      handleChange(ev){
        this.setState({[ev.target.name]:ev.target.value})
      }
      async loginer(){
          this.toggle();
          
          let url = "http://localhost:3000/vacation/login";
          const rawResponse = await fetch(url, {
            method: 'POST',
            headers: {
              "Accept":"application/json",
              "Content-Type":"application/json"
            },
            body:JSON.stringify({username:this.state.username, password:this.state.password})
          });
          const data = await rawResponse.json();
           if(data.success == true){
            alert('User has been identified!!!')
          }
          else{
            alert('not a valid user!')
          }          
        }
}
