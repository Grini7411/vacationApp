import React, { Component } from 'react'
import Vacation from './Vacation';





// all vacations view

export default class AllVacation extends Component {

    constructor(props){
        super(props)
        this.state={
            followed:[],
            unfollowed:[]
        }
    }

    componentDidMount() {
        this.setState({followed: this.props.vacs.filter(v => v.followed),
            unfollowed:this.props.vacs.filter(v=>!v.followed)})

        this.props.refresh();

    }
    componentWillReceiveProps(newProp){
        console.log(newProp)
        console.log(newProp.vacs)
        this.props = newProp
        this.setState({followed: this.props.vacs.filter(v => v.followed),
            unfollowed:this.props.vacs.filter(v=>!v.followed)})


    }
    

    // async componentDidMount() {
    //     debugger;
        // let url2 = "http://localhost:3000/vacation/checkuser"
        // const rawResponse = await fetch(url2)
    
        // const data = await rawResponse.json();
        // if(data.msg==="not connected")
        // {
        //     console.log('user is not connected');
        //     this.props.history.push('/');
        // }
        // else{
        //     debugger;
        //     alert('Hello' + data.username);
        //     // this.props.hello(data.username);
            
        // }

    

    // }
    
    render() {
        return (
            <div>
                {/* <h2>all vacations</h2> */}
                {/* {this.props.vacs.map(v => <Vacation key={v.id} sort={this.sortCards.bind(this)} users={this.props.users} refresh={this.props.refresh} vac={v}/>)} */}
                <div className="followed" >
                    {this.state.followed.map(v => <Vacation username={this.props.username} key={v.id} sort={this.sortUnFollowed.bind(this)} users={this.props.users} refresh={this.props.refresh} vac={v}/>)}
                </div>
                <div className="unfollowed" >
                    {this.state.unfollowed.map(v => <Vacation key={v.id} sort={this.sortFollowed.bind(this)} users={this.props.users} refresh={this.props.refresh} vac={v}/>)}
                </div>
            </div>
            
        )
    }
    sortFollowed(key){
        
        let newUnFollowed = this.state.unfollowed.filter(v => v.id !== key);
        let item = this.state.unfollowed.find(v => v.id === key);
        item.followed = true
        let newFollowed = this.state.followed;
        newFollowed.push(item);
        this.setState({followed:newFollowed,unfollowed:newUnFollowed});

    }
    sortUnFollowed(key){
        let newFollowed = this.state.followed.filter(v => v.id !== key);
        let item = this.state.followed.find(v => v.id === key);
        item.followed = false
        let newUnFollowed = this.state.unfollowed;
        newUnFollowed.push(item);
         this.setState({followed:newFollowed,unfollowed:newUnFollowed});

    }
}
