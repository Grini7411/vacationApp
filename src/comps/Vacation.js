import React, { Component } from 'react';
import {Card,CardBody,CardTitle, Input,Label,CardText,Button} from 'reactstrap';
import UpdaterM from './UpdaterM';
import {raiseRefresh} from '../newFile'


export default class Vacation extends Component {
    constructor(props){
        super(props);
        this.state = {
            tar:"",
            allcards:[],
            showComponent: false,
            isAdmin:true
          }
        
    }
    

    modalHandler() {
        this.setState({
          showComponent: !this.state.showComponent,
        });
        
      }


      async componentDidMount(){
        let url1 = 'http://localhost:3000/vacation/jointypes';
        let resp1 = await fetch(url1);
        let data1 = await resp1.json();

        if(this.props.username === data1.userName){
          debugger;
          if(data1.type === 'admin'){
            debugger;
            this.setState({isAdmin:true})
          }
          else{this.setState({isAdmin:false})}
        }
          }
    
    


    render() {
        return (
            <div>
                <Card id={this.props.vac.title} className="card-inline" >
                   
                    <div className="buttons">
                        <Button onClick={this.modalHandler.bind(this)}  color="primary">edit</Button>
                        <button className="delvac"  onClick={this.del.bind(this)}>X</button>
                    </div>
                    {this.state.showComponent ? <UpdaterM  vacation={this.props.vac} modalHandler={this.modalHandler.bind(this)}  cardId={this.props.vac.id} refresh={this.props.refresh} />:null
                    }
                    
                    <img src={this.props.vac.picture} className="image" alt=""/>
                    <CardTitle className="text-center">{this.props.vac.title}<p></p></CardTitle>
                    <CardBody>
                    
                        <CardText>
                            <div className="description">Description: {this.props.vac.description}</div>
                            <div>Dates: {dateFormatter(this.props.vac.start_date)} - {dateFormatter(this.props.vac.end_date)}</div>
                            <div>Price: {this.props.vac.price} $</div>
                        </CardText>
                        
                        <div>
                            <Input type="checkbox" name="check" defaultChecked={this.props.vac.followed} onClick={this.followVacation.bind(this)}/>
                            <Label for="exampleCheck" check>Follow Me!</Label>
                        </div>
                        

                    </CardBody>
                </Card>
            </div>
        )
    }


    async del(ev){
        
        this.state.tar = ev.target.parentElement.parentElement.id;
        debugger;
        let resp = await fetch('http://localhost:3000/vacation/delvac', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({tar:this.state.tar,vacID:this.props.vac.id})
        })
        debugger;
        alert("the vacation delete is complete")
        raiseRefresh();
        this.props.refresh()
        const data = await resp.json();
        
        

    }


    async followVacation(ev){
        var savedTarget = ev.target;
        // var userNum = parseInt(getCookie('id'));
        
        
        // var httpBody = {vacID:this.state.vacID, userID:this.state.userID,vacCounter:this.state.vacCounter};
        var httpBody2 = {vacID:this.props.vac.id}
        
        if(savedTarget.checked){
            
            
            
            let url = "http://localhost:3000/vacation/addtofollow";
            const rawResponse = await fetch(url, {
              method: 'POST',
              headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"
              },
              body:JSON.stringify(httpBody2)
            });
            const data = await rawResponse.json();
            alert(`the count of vacs is ${data.counter}`)
            // await this.setState({vacCounter:data.counter})
            this.props.sort(this.props.vac.id);
  
        }
        else{
            
             let resp = await fetch('http://localhost:3000/vacation/delfollow', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(httpBody2)
                })
                let data1 = await resp.json();
                this.props.sort(this.props.vac.id);
                alert('the vacation deleted from following')
        
        }
    }



}



function dateFormatter(date)
{
    let formatted = new Date(date);
    return `${formatted.getDate()}/${formatted.getMonth()+1}/${formatted.getFullYear()}`
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

