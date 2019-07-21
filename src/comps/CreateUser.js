import React, { Component } from 'react'
import { Button, Input } from 'reactstrap';


export default class CreateUser extends Component {
  state={
    msg:"",
    isDisabled:true,
    fields:{}

  }


    
    render() {
        return (
            <div>
                <Input placeholder="Name" className="mandatoryField user-field" name="name" onChange={this.handleChange.bind(this)}/>
                <Input placeholder="Last Name" className="mandatoryField user-field" name="lastName" onChange={this.handleChange.bind(this)}/>
                <Input placeholder="Username"  className="mandatoryField user-field" name="username" onChange={this.handleChange.bind(this)}/>
                <div>{this.state.msg}</div>
                <Input placeholder="Password" className="mandatoryField user-field" name="password" onChange={this.handleChange.bind(this)}/>
                <Button disabled={this.state.isDisabled} onClick={this.saveUser.bind(this)}>Create user!</Button>

            </div>
        )
    }
    handleChange(ev){
        let newFields = this.state.fields;
        newFields[ev.target.name] = ev.target.value;
        this.setState({fields:newFields});
        
        
        if(ev.target.value.length >0){
          ev.target.classList.remove('mandatoryField')
          
        }
        else{
          ev.target.classList.add('mandatoryField')
        }
        this.userChecker();
        

        let disabled = false
        if(Object.keys(this.state.fields).length < 4){
          disabled = true;

        }
        for(let key in this.state.fields){
            if(this.state.fields[key].length === 0){
                disabled = true;
            }

        }
        this.setState({isDisabled:disabled});



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
          body: JSON.stringify(this.state.fields)
        });
        const content = await rawResponse.json();
        console.log(content)
        debugger;
        alert('user created!');
        this.props.history.push('/allvacs');
      
    }
}
