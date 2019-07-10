import React, { Component } from 'react';
// import { Input,Button,Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import CreateUser from './comps/CreateUser';
import CreateVacation from './comps/CreateVacation';
import LogIn from './comps/LogIn';
import AllVacation from './comps/AllVacation';
import './App.css'



export default class App extends Component {
  state={
    allvacs:[],
    allusers:[]
  }
  
  
  async componentWillMount() {
    
    
    let url = "http://localhost:3000/vacation/checkuser"
    const rawResponse = await fetch(url)
    
    const data = await rawResponse.json();
    if(data.msg=="not connected")
    {
       console.log('user is not connected');
       
      // this.props.history.push('/home');
    }
    else{
      alert(data.username)
    }

}

async componentDidMount() {

  this.refresh();
}

async refresh(){
    //get all vacations

  let url1 = 'http://localhost:3000/vacation/vacs';
  let resp1 = await fetch(url1);
  let data1 = await resp1.json();
  this.setState({allvacs:data1})

}

  

  render() {
    return (
      <div className="App">
        <h1>Vacation master</h1>
        <Router>
          <div><Link to="/">Home</Link></div>
          <Link to="/create">Create User</Link>
          <div><Link to="/vacre">Create Vacation</Link></div>
          <div><Link to="/login">Log -In</Link></div>
          <div><Link to="/allvacs">All Vacations</Link></div>

          <Route exact path="/" render={a=><Home/>}></Route>
          <Route path="/login" render={a=><LogIn/>}></Route>
          <Route path="/create" render={a=><CreateUser refresh={this.refresh.bind(this)}/>}></Route>
          <Route path="/vacre" render={a=><CreateVacation refresh={this.refresh.bind(this)}/>}></Route>
          <Route path="/allvacs" render={() => <AllVacation  refresh={this.refresh.bind(this)} vacs={this.state.allvacs}/>}></Route>
          
        

        </Router>
      </div>
    )
  }
}

function Home(){
  return(
    <div className="App">
      <h1>Vacationer Home Page</h1>
      <a href="/allvacs">show all vacations</a>
      
      
    </div>
  )
}




