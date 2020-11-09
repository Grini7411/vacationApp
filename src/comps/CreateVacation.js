import React, { Component } from 'react';
import {Input, Button} from 'reactstrap';
import {raiseRefresh} from '../newFile'

export default class CreateVacation extends Component {
    constructor(props){
        super(props)
        this.state={
            picture:[]
        }
    }

    componentDidMount() {

        var myWidget = window.cloudinary.createUploadWidget(
            {
            cloudName: 'dxyrc1vmi', 
            uploadPreset: 'rmjvy2h4'
            }, 
            (error, result) => { 
            if (!error && result && result.event === "success") { 
            console.log('Done! Here is the image info: ', result.info);
                this.setState({picture:result.info.secure_url})
                }
            }
        )
            
            document.getElementById("upload_widget").addEventListener("click", function(){
            myWidget.open();
            }, false);
    }

    render() {
        return (
            <div>
                <Input placeholder="Title" name="title" onChange={this.handleChange.bind(this)} />
                <Input placeholder="Description" name="description" onChange={this.handleChange.bind(this)}/>
                <Input placeholder="Price" name="price" onChange={this.handleChange.bind(this)}/>
                
                <button id="upload_widget" className="cloudinary-button">Upload Picture</button>

                <Input placeholder="Start Date" type='date' name="startDate" onChange={this.handleChange.bind(this)}/>
                <Input placeholder="End Date" type="date" name="endDate" onChange={this.handleChange.bind(this)}/>
                <Button onClick={this.save.bind(this)}>Save!</Button>


                



            </div>
        )
    }
    handleChange(ev){
        
        this.setState({[ev.target.name]:ev.target.value})

      }

    async save(){
        
        let url = 'http://localhost:3000/vacation/addvac';
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
          raiseRefresh();
          alert('vacation created!')
          await this.props.refresh();
          this.props.history.push('/allvacs')
    }
    
}
