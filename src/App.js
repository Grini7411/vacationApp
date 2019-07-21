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
      showLogin:false
    }
  }

  async modalHandler1() {
    await this.setState({
      showLogin: !this.state.showLogin,
    });
    
  }

  
async componentDidMount() {

  // socket.on('refresh', async (data) => {
  //   console.log('refresh receieved')
  //   this.refresh()
  // })


  this.refresh();
}

async refresh(){
    // 
    
    let url1 = 'http://localhost:3000/vacation/vacs';
    let resp1 = await fetch(url1);
    let data1 = await resp1.json();
    this.setState({allvacs:data1})
    console.log('got all vacs!')
    console.log(data1)
    
    // console.log(data1.msg);
  
  // })



  //get all users:
  let url2 = 'http://localhost:3000/vacation/getallusers';
  let resp2 = await fetch(url2);
  let data2 = await resp2.json();
  this.setState({allusers:data2})
  

  //for the graphs
  let url3 = 'http://localhost:3000/vacation/vacs_graph';
  let resp3 = await fetch(url3);
  let data3 = await resp3.json();
  await this.setState({allgraphs:data3})
  
  // this.props.history.push('/allvacs')


}



  

  render() {
    const divStyle ={color:'white'}


    var isLoggedIn = this.state.userConnected.connect;
    var user = this.state.userConnected.username;
    var Comp;
    
    
    if(isLoggedIn === true){
    Comp = <span>
    <p className="connected">Welcome {user}</p>
    <Button color="link" onClick={this.logout.bind(this)}>Log-out</Button>
</span>
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
                <Link to="/vacre">Create Vacation</Link>
              </NavItem>
              
              <NavItem>
                <Link to="/allvacs">All Vacations</Link>
              </NavItem>
              <NavItem>
                <Link to="/graph">Graph</Link>
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
  // msgHello(name){
  //   debugger;
  //   return `Welcome ${name}`
  // }
  getLoginName(username,isConnected){
    this.setState(Object.assign(this.state.userConnected,{connect:isConnected,username:username}))
    
  }
  async logout(){
    
    let resp = await fetch('http://localhost:3000/vacation/logout');
    let data = await resp.json();

    this.setState(Object.assign(this.state.userConnected,{connect:false,username:""}))
    window.location.href = '/'

  }

  
}






// function getCookie(cname) {
//   var name = cname + "=";
//   var decodedCookie = decodeURIComponent(document.cookie);
//   var ca = decodedCookie.split(';');
//   for(var i = 0; i <ca.length; i++) {
//     var c = ca[i];
//     while (c.charAt(0) == ' ') {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) == 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// }
