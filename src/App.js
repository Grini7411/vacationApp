import React, { Component } from 'react';
 import { Collapse, Navbar,
   NavbarBrand, Nav, NavItem,Button} from 'reactstrap';
import {  Route, Link } from "react-router-dom";
import { subscribeToRefresh } from './newFile'
import CreateUser from './comps/CreateUser';
import CreateVacation from './comps/CreateVacation';
import LogIn from './comps/LogIn';
import AllVacation from './comps/AllVacation';
import './App.css'
import Graphs from './comps/Graphs';
// import openSocket from 'socket.io-client';


// const socket = openSocket('http://localhost:8000/');





export default class App extends Component {

  constructor(props){
    super(props)
    
    subscribeToRefresh(() => {
      console.log('refresh required')
      this.refresh()
    });

    this.state={
      allvacs:[],
      allusers:[],
      allgraphs:[],
      userConnected:{connect:false,username:""},
      showLogin:false,
      isAdmin:false
    }
  }

  async modalHandler1() {
    await this.setState({
      showLogin: !this.state.showLogin,
    });
    
  }

  
async componentDidMount() {

  this.refresh();
}

async refresh(){
    let url1 = 'http://localhost:3000/vacation/vacs';
    let resp1 = await fetch(url1);
    let data1 = await resp1.json();
    this.setState({allvacs:data1})

  // get all users:
  let url2 = 'http://localhost:3000/vacation/getallusers';
  let resp2 = await fetch(url2);
  let data2 = await resp2.json();
  this.setState({allusers:data2})
  

  // for the graphs
  let url3 = 'http://localhost:3000/vacation/vacs_graph';
  let resp3 = await fetch(url3);
  let data3 = await resp3.json();
  await this.setState({allgraphs:data3})
  
  this.checkType(this.state.userConnected.username);
}



  

  render() {
    const divStyle = {color:'white'}
    

    var isLoggedIn = this.state.userConnected.connect;
    var user = this.state.userConnected.username;
    var Comp;
    var addVac;
    var graph;
    
    
    if(isLoggedIn === true){
    Comp = <span>
    <p className="connected">Welcome {user}</p>
    <Button color="link" onClick={this.logout.bind(this)}>Log-out</Button></span>;

    

      if(this.state.isAdmin === true){
        addVac = <Link to="/vacre">Create Vacation</Link>;
        graph = <Link to="/graph">Graph</Link>;

      }
    }
    else{
      Comp = <Link to="/">Log -In</Link>
    }

    

    return (
      <div >
        
        <Navbar color="dark" light expand="lg">
          <NavbarBrand style={divStyle}>Vacation master</NavbarBrand>
          
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Link to="/create">Create User</Link>
              </NavItem>

              <NavItem>
                {addVac}
              </NavItem>
                
              <NavItem>
                <Link to="/allvacs">All Vacations</Link>
              </NavItem>

              <NavItem>
                {graph}
              </NavItem>

              <NavItem>
                {Comp}
              </NavItem>



            </Nav>
          </Collapse>
        </Navbar>
        
          
          

          <Route path="/" render={(props)=><LogIn {...props} modalHandler1={this.modalHandler1.bind(this)} getLoginName={this.getLoginName.bind(this)} refresh={this.refresh.bind(this)}/>}></Route>
          <Route path="/create" render={(props)=><CreateUser {...props} refresh={this.refresh.bind(this)}/>}></Route>
          <Route path="/vacre" render={(props)=><CreateVacation {...props} refresh={this.refresh.bind(this)}/>}></Route>
          <Route path="/allvacs" render={(props) => <AllVacation {...props} users={this.state.allusers} username={this.state.userConnected.username}  refresh={this.refresh.bind(this)} vacs={this.state.allvacs}/>}></Route>
          <Route path="/graph" render={(props) => <Graphs {...props} vacs={this.state.allgraphs}/>}></Route>
        

        
      </div>
    )
  }
  
  
  
  getLoginName(username,isConnected){
    this.setState(Object.assign(this.state.userConnected,{connect:isConnected,username:username}))
    
  }
  async logout(){
    
    let resp = await fetch('http://localhost:3000/vacation/logout');
    let data = await resp.json();

    this.setState(Object.assign(this.state.userConnected,{connect:false,username:""}))
    window.location.href = '/'

  }
  async checkType(username){
    let url1 = 'http://localhost:3000/vacation/jointypes';
    let resp1 = await fetch(url1);
    let data1 = await resp1.json();
    
    for (let i = 0; i < data1.length; i++) {
      if(username === data1[i].userName){
        
          if(data1[i].type === 'admin'){
          
              await this.setState({isAdmin:true})
          }
          else{await this.setState({isAdmin:false})}
        }
      
    }
    }

  }
  





