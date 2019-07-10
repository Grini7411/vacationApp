import React, { Component } from 'react';
import {Card,CardBody,CardTitle, Input,Label,CardText,Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import { throwStatement } from '@babel/types';
import UpdaterM from './UpdaterM';

export default class Vacation extends Component {

    state={
        tar:"",
        allcards:[],
        showComponent: false

       
    }
    


    whatIsUser(){
        
        return this.props.user ==='admin'
    }


    
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    };

    _onButtonClick() {
        this.setState({
          showComponent: true,
        });
      }
    
    


    render() {
        return (
            <div>
                <Card id={this.props.vac.title} >
                   
                    <div className="buttons">
                        <button onClick={this._onButtonClick.bind(this)} className="iparon">edit</button>
                        <button onClick={this.del.bind(this)}>X</button>
                    </div>
                    {this.stat.showComponent ? <UpdaterM cardId={this.props.vac.title}  toggler={this.toggle.bind(this)} updater={this.updateVacation.bind(this)}/>:null
                    }
                    
                    <img src={this.props.vac.picture} alt=""></img>
                    <CardTitle className="text-center">{this.props.vac.title}</CardTitle>
                    <CardBody>
                    
                        <CardText>
                            <div>Description: {this.props.vac.description}</div>
                            <div>Dates: {dateFormatter(this.props.vac.start_date)} - {dateFormatter(this.props.vac.end_date)}</div>
                            <div>Price: {this.props.vac.price} $</div>
                        </CardText>
                        
                        <div>
                            <Input type="checkbox" name="check" onClick={this.followVacation.bind(this)}/>
                            <Label for="exampleCheck" check>Follow Me!</Label>
                        </div>
                        

                    </CardBody>
                </Card>
            </div>
        )
    }


    del(ev){
        
        this.state.tar = ev.target.parentElement.parentElement.id;
        debugger;
        fetch('http://localhost:3000/vacation/delvac', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({tar:this.state.tar})
        })
        .then(res => res.json()) 
        this.props.refresh();

    }


    followVacation(ev){
        debugger;
        if(ev.target.checked){
            this.setState({allcards:ev.target.parentElement.parentElement.parentElement})
        }
        else{

        }
    }
    updateVacation(){
        
        
        for(let key in this.state){
            console.log(this.state.key);
            debugger;
            
        }
        fetch('http://localhost:3000/vacation/updatevac', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json',
            "Accept":"application/json"},
            body: JSON.stringify()
            })
            .then(res => res.json()) 
            this.props.refresh();
    
    }


}



function dateFormatter(date)
{
    let formatted = new Date(date);
    return `${formatted.getDate()}/${formatted.getMonth()+1}/${formatted.getFullYear()}`
}



