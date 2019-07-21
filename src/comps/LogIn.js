import React, { Component } from 'react'
import { Input,Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export default class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
          modal: true
        };
    
        
      }
    
      async toggle1() {
        debugger;
        if(this.state.modal === true){
            this.props.modalHandler1();
            debugger;
        }
        await this.setState({
          modal: !this.state.modal
        });
        
    };
    
      render() {
        return (
          <div>
            <Modal isOpen={this.state.modal} className={this.props.className}>
              <ModalHeader toggle={this.toggle1.bind(this)}>Please Login</ModalHeader>
              <ModalBody>
                <Input placeholder="username" name="username" onChange={this.handleChange.bind(this)} />
                <Input placeholder="password" name="password" onChange={this.handleChange.bind(this)} />

              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={this.loginer.bind(this)}>Log-In!</Button>
                <Button color="secondary" onClick={this.toggle1.bind(this)}>Cancel</Button>
                <Button onClick={this.creator.bind(this)}>Create a new User</Button>
              </ModalFooter>
            </Modal>
          </div>
        );
      }
      handleChange(ev){
        this.setState({[ev.target.name]:ev.target.value})
      }

      creator(){
        this.props.history.push('/create');
      }

      async loginer(){
          this.toggle1();
          
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
           if(data.success === true){
            alert('User has been identified!!!')
            
            // setCookie('username','Latin',50);
            // setCookie('id',3,50);
            
            await this.props.refresh()
            this.props.getLoginName(data.userConnected.userName,data.success);
            this.props.history.push('/allvacs')
            
          }
          else{
            alert('not a valid user!')
            this.props.history.push('/login')
          }          
        }
}

// function setCookie(cname, cvalue, exdays) {
//   var d = new Date();
//   d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
//   var expires = "expires="+d.toUTCString();
//   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }
