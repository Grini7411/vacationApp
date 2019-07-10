import React, { Component } from 'react'
import { Button, Input } from 'reactstrap';


export default class CreateUser extends Component {
  state={
    msg:""
  }
    render() {
        return (
            <div>
                <Input placeholder="Name" name="name" onChange={this.handleChange.bind(this)}/>
                <Input placeholder="Last Name" name="lastName" onChange={this.handleChange.bind(this)}/>
                <Input placeholder="Username" name="username" onChange={this.handleChange.bind(this)}/>
                <div>{this.state.msg}</div>
                <Input placeholder="Password" name="password" onChange={this.handleChange.bind(this)}/>
                <Button onClick={this.saveUser.bind(this)}>Create user!</Button>

            </div>
        )
    }
    async handleChange(ev){
        this.setState({[ev.target.name]:ev.target.value})
        this.userChecker();

          


      }
      async userChecker(){
        let url = 'http://localhost:3000/vacation/getallusers';
        let resp = await fetch(url);
        let data1 = await resp.json();
        let allUsernames = data1.map(x => x.userName);
        

        if(allUsernames.includes(this.state.username)){
          this.setState({msg:"user is already exists"})
        }
        else{
          this.state.msg = "ok!"
        }

      }
    
    async saveUser(){
        let url = 'http://localhost:3000/vacation/addaccount';
        const rawResponse = await fetch(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state)
        });
        const content = await rawResponse.json();
        console.log(content);
        alert('user created!')
      
    }
}
